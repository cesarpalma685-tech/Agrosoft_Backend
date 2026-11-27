import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";

type Tipo = "unidad" | "lote" | "sublote" | "cultivo";

interface Regla {
  tabla: string;
  etiqueta: string;
  /** Registros que impiden eliminar: tabla, columna que apunta al elemento y cómo se llaman. */
  dependientes: { tabla: string; columna: string; nombre: string }[];
}

// Solo el administrador elimina (lo exige AdminGuard en los controladores). Un elemento con
// registros que dependen de él no se elimina: primero hay que quitar lo de abajo.
const REGLAS: Record<Tipo, Regla> = {
  unidad: {
    tabla: "unidades_productivas",
    etiqueta: "La unidad productiva",
    dependientes: [{ tabla: "lotes", columna: "unidad_productiva_id", nombre: "lotes" }],
  },
  lote: {
    tabla: "lotes",
    etiqueta: "El lote",
    dependientes: [
      { tabla: "sublotes", columna: "lote_id", nombre: "sublotes" },
      { tabla: "cultivos", columna: "lote_id", nombre: "cultivos" },
      { tabla: "sensores", columna: "lote_id", nombre: "sensores" },
    ],
  },
  sublote: {
    tabla: "sublotes",
    etiqueta: "El sublote",
    dependientes: [
      { tabla: "cultivos", columna: "sublote_id", nombre: "cultivos" },
      { tabla: "sensores", columna: "sub_lote_id", nombre: "sensores" },
    ],
  },
  cultivo: {
    tabla: "cultivos",
    etiqueta: "El cultivo",
    dependientes: [
      { tabla: "actividades", columna: "cultivo_id", nombre: "actividades" },
      { tabla: "lotes_produccion", columna: "cultivo_id", nombre: "cosechas" },
      { tabla: "ventas_detalles", columna: "cultivo_id", nombre: "ventas" },
      { tabla: "contingencias", columna: "cultivo_id", nombre: "contingencias fitosanitarias" },
      { tabla: "tratamientos_fitosanitarios", columna: "cultivo_id", nombre: "tratamientos fitosanitarios" },
      { tabla: "sensores", columna: "\"cultivoId\"", nombre: "sensores" },
    ],
  },
};

@Injectable()
export class EliminacionTerritorioService {
  constructor(private readonly dataSource: DataSource) {}

  async eliminar(tipo: Tipo, id: number): Promise<{ mensaje: string }> {
    const regla = REGLAS[tipo];
    await this.dataSource.transaction(async (m) => {
      const existe = await m.query(`SELECT 1 FROM ${regla.tabla} WHERE id = $1 AND deleted_at IS NULL`, [id]);
      if (existe.length === 0) throw new NotFoundException(`${regla.etiqueta} con ID ${id} no existe`);

      const bloqueos: string[] = [];
      for (const dep of regla.dependientes) {
        const [{ total }] = await m.query(
          `SELECT count(*)::int AS total FROM ${dep.tabla} WHERE ${dep.columna} = $1 AND deleted_at IS NULL`,
          [id],
        );
        if (total > 0) bloqueos.push(`${total} ${dep.nombre}`);
      }
      if (bloqueos.length > 0) {
        throw new ConflictException(
          `${regla.etiqueta} no se puede eliminar porque tiene ${bloqueos.join(", ")}. Elimina o mueve primero esos registros.`,
        );
      }

      // Las metas de producción de una unidad no tienen sentido sin ella
      if (tipo === "unidad") await m.query(`DELETE FROM metas_produccion WHERE unidad_productiva_id = $1`, [id]);
      await m.query(`UPDATE ${regla.tabla} SET deleted_at = now() WHERE id = $1`, [id]);
    });
    return { mensaje: `${regla.etiqueta} se eliminó correctamente` };
  }
}
