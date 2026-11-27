import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaProduccionOrmEntity } from "../../infrastructure/persistence/meta-produccion.orm-entity";
import { UnidadProductivaRepositoryPort } from "../../../../territorio/unidades_productivas/application/ports/unidad-productiva.repository.port";
import { DefinirMetaDto } from "../dto/definir-meta.dto";

export interface MetaConAvance {
  id: number;
  unidadProductivaId: number;
  anio: number;
  metaAnual: number;
  esperadoFecha: number;
  ventasMensuales: { mes: number; ventas: number; acumulado: number; avance: number }[];
}

const redondear = (v: number, dec = 2) => Number(v.toFixed(dec));

/** Porcentaje del año transcurrido: lo que «se espera» haber vendido a la fecha si el ritmo fuera parejo. */
function esperadoFecha(anio: number, hoy = new Date()): number {
  if (anio < hoy.getFullYear()) return 100;
  if (anio > hoy.getFullYear()) return 0;
  const inicio = new Date(anio, 0, 1).getTime();
  const fin = new Date(anio + 1, 0, 1).getTime();
  return redondear(((hoy.getTime() - inicio) / (fin - inicio)) * 100, 1);
}

@Injectable()
export class MetasProduccionUseCases {
  constructor(
    @InjectRepository(MetaProduccionOrmEntity) private readonly repository: Repository<MetaProduccionOrmEntity>,
    private readonly unidades: UnidadProductivaRepositoryPort,
  ) {}

  /** Cada meta con las ventas de su unidad mes a mes (ventas no anuladas de cosechas de esa unidad). */
  async avance(): Promise<MetaConAvance[]> {
    const metas = await this.repository.find({ order: { anio: "DESC", id: "ASC" } });
    const hoy = new Date();
    const resultado: MetaConAvance[] = [];

    for (const meta of metas) {
      const filas: { mes: number; ventas: string }[] = await this.repository.query(
        `SELECT EXTRACT(MONTH FROM v.fecha)::int AS mes, COALESCE(SUM(d.precio_total), 0) AS ventas
           FROM ventas v
           JOIN ventas_detalles d ON d.venta_id = v.id AND d.deleted_at IS NULL
           JOIN lotes_produccion lp ON lp.id = d.lote_produccion_id
           JOIN lotes l ON l.id = lp.lote_id
          WHERE v.deleted_at IS NULL AND v.estado <> 'anulada'
            AND l.unidad_productiva_id = $1 AND EXTRACT(YEAR FROM v.fecha) = $2
          GROUP BY 1`,
        [meta.unidadProductivaId, meta.anio],
      );
      const porMes = new Map(filas.map((f) => [f.mes, Number(f.ventas)]));
      const hasta = meta.anio === hoy.getFullYear() ? hoy.getMonth() + 1 : meta.anio < hoy.getFullYear() ? 12 : 0;

      let acumulado = 0;
      const ventasMensuales: MetaConAvance["ventasMensuales"] = [];
      for (let mes = 1; mes <= hasta; mes++) {
        const ventas = redondear(porMes.get(mes) ?? 0);
        acumulado = redondear(acumulado + ventas);
        ventasMensuales.push({ mes, ventas, acumulado, avance: redondear((acumulado / meta.valorMeta) * 100, 1) });
      }
      resultado.push({
        id: meta.id,
        unidadProductivaId: meta.unidadProductivaId,
        anio: meta.anio,
        metaAnual: meta.valorMeta,
        esperadoFecha: esperadoFecha(meta.anio, hoy),
        ventasMensuales,
      });
    }
    return resultado;
  }

  /** Crea la meta o actualiza la de esa unidad y año (RF9.4). */
  async definir(dto: DefinirMetaDto, usuarioId: number) {
    const unidad = await this.unidades.findById(dto.unidadProductivaId);
    if (!unidad) throw new NotFoundException(`La unidad productiva con ID ${dto.unidadProductivaId} no existe`);

    const existente = await this.repository.findOne({ where: { unidadProductivaId: dto.unidadProductivaId, anio: dto.anio } });
    await this.repository.save(
      this.repository.create({ ...(existente ?? {}), unidadProductivaId: dto.unidadProductivaId, anio: dto.anio, valorMeta: dto.valorMeta, definidaPorUsuarioId: usuarioId }),
    );
    return (await this.avance()).find((m) => m.unidadProductivaId === dto.unidadProductivaId && m.anio === dto.anio);
  }
}
