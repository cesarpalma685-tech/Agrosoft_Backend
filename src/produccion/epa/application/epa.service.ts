import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { EpaOrmEntity } from "../infrastructure/persistence/epa.orm-entity";
import { TipoCultivoWikiOrmEntity } from "../../../wiki_agronomia/tipo-cultivo-wiki/infrastructure/persistence/tipo-cultivo-wiki.orm-entity";
import { ActualizarEpaDto, CrearEpaDto } from "./dto/crear-epa.dto";

const RELACIONES = { tiposCultivosWiki: true, creadoPorUsuario: true } as const;

@Injectable()
export class EpaService {
  constructor(
    @InjectRepository(EpaOrmEntity) private readonly epas: Repository<EpaOrmEntity>,
    @InjectRepository(TipoCultivoWikiOrmEntity) private readonly tiposCultivo: Repository<TipoCultivoWikiOrmEntity>,
  ) {}

  /** La lista no trae las fotos (pesan): solo cuántas hay. El detalle sí las incluye. */
  private vista(e: EpaOrmEntity, conFotos: boolean) {
    return {
      id: e.id,
      nombre: e.nombre,
      tipoEpa: e.tipoEpa,
      descripcion: e.descripcion ?? "",
      sintomas: e.sintomas ?? "",
      manejoYControl: e.manejoYControl ?? "",
      mesesProbables: e.mesesProbables ?? [],
      temporadas: e.temporadas ?? [],
      notasEstacionalidad: e.notasEstacionalidad ?? "",
      tags: e.tags ?? [],
      tiposCultivo: (e.tiposCultivosWiki ?? []).map((t) => ({ id: t.id, nombre: t.nombre })),
      creadoPor: e.creadoPorUsuario ? `${e.creadoPorUsuario.nombre} ${e.creadoPorUsuario.apellido}`.trim() : null,
      createdAt: e.createdAt,
      totalFotos: (e.fotosSintomas?.length ?? 0) + (e.fotosGenerales?.length ?? 0),
      ...(conFotos ? { fotosSintomas: e.fotosSintomas ?? [], fotosGenerales: e.fotosGenerales ?? [] } : {}),
    };
  }

  async listar() {
    const filas = await this.epas.find({ relations: RELACIONES, order: { nombre: "ASC" } });
    return filas.map((e) => this.vista(e, false));
  }

  async obtener(id: number) {
    const fila = await this.epas.findOne({ where: { id }, relations: RELACIONES });
    if (!fila) throw new NotFoundException(`La ficha de EPA con ID ${id} no existe`);
    return this.vista(fila, true);
  }

  private async tiposDe(ids?: number[]) {
    return ids && ids.length > 0 ? this.tiposCultivo.find({ where: { id: In(ids) } }) : [];
  }

  async crear(dto: CrearEpaDto, usuarioId: number) {
    const { tiposCultivoIds, ...datos } = dto;
    const guardada = await this.epas.save(
      this.epas.create({
        ...datos,
        nombre: dto.nombre.trim(),
        creadoPorUsuarioId: usuarioId,
        tiposCultivosWiki: await this.tiposDe(tiposCultivoIds),
      }),
    );
    return this.obtener(guardada.id);
  }

  async actualizar(id: number, dto: ActualizarEpaDto) {
    const actual = await this.epas.findOne({ where: { id }, relations: RELACIONES });
    if (!actual) throw new NotFoundException(`La ficha de EPA con ID ${id} no existe`);
    const { tiposCultivoIds, ...datos } = dto;
    Object.assign(actual, Object.fromEntries(Object.entries(datos).filter(([, v]) => v !== undefined)));
    if (tiposCultivoIds !== undefined) actual.tiposCultivosWiki = await this.tiposDe(tiposCultivoIds);
    await this.epas.save(actual);
    return this.obtener(id);
  }

  async eliminar(id: number) {
    const fila = await this.epas.findOne({ where: { id } });
    if (!fila) throw new NotFoundException(`La ficha de EPA con ID ${id} no existe`);
    await this.epas.softDelete(id);
  }
}
