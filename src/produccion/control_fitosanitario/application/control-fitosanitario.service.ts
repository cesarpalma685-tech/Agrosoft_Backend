import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContingenciaOrmEntity } from "../infrastructure/persistence/contingencia.orm-entity";
import { TratamientoOrmEntity } from "../infrastructure/persistence/tratamiento.orm-entity";
import { CultivoOrmEntity } from "../../cultivo/infrastructure/persistence/cultivo.orm-entity";
import { UsuarioOrmEntity } from "../../../identidad/usuarios/infraestructure/persistence/usuario.orm-entity";
import {
  ActualizarContingenciaDto,
  ActualizarTratamientoDto,
  CrearContingenciaDto,
  CrearTratamientoDto,
  DecidirAprobacionDto,
} from "./dto/control-fitosanitario.dto";

const REL_CONTINGENCIA = { epa: true, cultivo: true, lote: { unidadProductiva: true }, sublote: true, registradoPor: true } as const;
const REL_TRATAMIENTO = { cultivo: true, lote: { unidadProductiva: true }, sublote: true, contingencia: true, aprobadoPor: true } as const;

const nombreDe = (u?: { nombre: string; apellido: string } | null) => (u ? `${u.nombre} ${u.apellido}`.trim() : null);

@Injectable()
export class ControlFitosanitarioService {
  constructor(
    @InjectRepository(ContingenciaOrmEntity) private readonly contingencias: Repository<ContingenciaOrmEntity>,
    @InjectRepository(TratamientoOrmEntity) private readonly tratamientos: Repository<TratamientoOrmEntity>,
    @InjectRepository(CultivoOrmEntity) private readonly cultivos: Repository<CultivoOrmEntity>,
    @InjectRepository(UsuarioOrmEntity) private readonly usuarios: Repository<UsuarioOrmEntity>,
  ) {}

  /* ───────── Contingencias ───────── */

  private vistaContingencia(c: ContingenciaOrmEntity, conFotos: boolean) {
    return {
      id: c.id,
      nombre: c.nombre,
      tipo: c.tipo,
      epa: c.epa ? { id: c.epa.id, nombre: c.epa.nombre, manejoYControl: c.epa.manejoYControl ?? "" } : null,
      cultivoId: c.cultivoId,
      cultivo: c.cultivo?.nombreCultivo ?? null,
      loteId: c.loteId,
      lote: c.lote?.nombre ?? null,
      subLoteId: c.subLoteId,
      sublote: c.sublote?.nombre ?? null,
      unidadProductivaId: c.lote?.unidad_productiva_id ?? null,
      unidad: c.lote?.unidadProductiva?.nombre ?? null,
      zona: c.zona,
      fecha: c.fecha,
      gravedad: c.gravedad,
      estado: c.estado,
      descripcion: c.descripcion,
      totalEvidencias: c.evidencias?.length ?? 0,
      registradoPor: nombreDe(c.registradoPor),
      ...(conFotos ? { evidencias: c.evidencias ?? [] } : {}),
    };
  }

  async listarContingencias() {
    const filas = await this.contingencias.find({ relations: REL_CONTINGENCIA, order: { fecha: "DESC", id: "DESC" } });
    return filas.map((c) => this.vistaContingencia(c, false));
  }

  async obtenerContingencia(id: number) {
    const fila = await this.contingencias.findOne({ where: { id }, relations: REL_CONTINGENCIA });
    if (!fila) throw new NotFoundException(`La contingencia con ID ${id} no existe`);
    return this.vistaContingencia(fila, true);
  }

  /** Si hay cultivo, el lote y el sublote salen de él. Debe quedar al menos una ubicación. */
  private async ubicacion(dto: { cultivoId?: number; loteId?: number; subLoteId?: number }) {
    let { loteId, subLoteId } = dto;
    if (dto.cultivoId !== undefined) {
      const cultivo = await this.cultivos.findOne({ where: { id: dto.cultivoId } });
      if (!cultivo) throw new NotFoundException(`El cultivo con ID ${dto.cultivoId} no existe`);
      loteId = loteId ?? cultivo.loteId;
      subLoteId = subLoteId ?? cultivo.subloteId ?? undefined;
    }
    return { loteId, subLoteId };
  }

  async crearContingencia(dto: CrearContingenciaDto, usuarioId: number) {
    const { loteId, subLoteId } = await this.ubicacion(dto);
    if (loteId === undefined && dto.cultivoId === undefined) throw new BadRequestException("Indica el cultivo o el lote afectado");
    const guardada = await this.contingencias.save(
      this.contingencias.create({
        nombre: dto.nombre.trim(),
        tipo: dto.tipo,
        epaId: dto.epaId ?? null,
        cultivoId: dto.cultivoId ?? null,
        loteId: loteId ?? null,
        subLoteId: subLoteId ?? null,
        zona: dto.zona?.trim() || null,
        fecha: dto.fecha.slice(0, 10),
        gravedad: dto.gravedad,
        estado: dto.estado ?? "activa",
        descripcion: dto.descripcion.trim(),
        evidencias: dto.evidencias ?? [],
        registradoPorUsuarioId: usuarioId,
      }),
    );
    return this.obtenerContingencia(guardada.id);
  }

  async actualizarContingencia(id: number, dto: ActualizarContingenciaDto) {
    const actual = await this.contingencias.findOne({ where: { id } });
    if (!actual) throw new NotFoundException(`La contingencia con ID ${id} no existe`);
    const cambios: Partial<ContingenciaOrmEntity> = {};
    if (dto.nombre !== undefined) cambios.nombre = dto.nombre.trim();
    if (dto.tipo !== undefined) cambios.tipo = dto.tipo;
    if (dto.epaId !== undefined) cambios.epaId = dto.epaId;
    if (dto.zona !== undefined) cambios.zona = dto.zona.trim() || null;
    if (dto.fecha !== undefined) cambios.fecha = dto.fecha.slice(0, 10);
    if (dto.gravedad !== undefined) cambios.gravedad = dto.gravedad;
    if (dto.estado !== undefined) cambios.estado = dto.estado;
    if (dto.descripcion !== undefined) cambios.descripcion = dto.descripcion.trim();
    if (dto.evidencias !== undefined) cambios.evidencias = dto.evidencias;
    if (dto.cultivoId !== undefined || dto.loteId !== undefined || dto.subLoteId !== undefined) {
      const { loteId, subLoteId } = await this.ubicacion(dto);
      if (dto.cultivoId !== undefined) cambios.cultivoId = dto.cultivoId;
      if (loteId !== undefined) cambios.loteId = loteId;
      cambios.subLoteId = subLoteId ?? null;
    }
    await this.contingencias.update(id, cambios);
    return this.obtenerContingencia(id);
  }

  async eliminarContingencia(id: number) {
    if (!(await this.contingencias.findOne({ where: { id } }))) throw new NotFoundException(`La contingencia con ID ${id} no existe`);
    await this.contingencias.softDelete(id);
  }

  /* ───────── Tratamientos ───────── */

  private vistaTratamiento(t: TratamientoOrmEntity) {
    return {
      id: t.id,
      nombre: t.nombre,
      tipo: t.tipo,
      cultivoId: t.cultivoId,
      cultivo: t.cultivo?.nombreCultivo ?? null,
      loteId: t.loteId,
      lote: t.lote?.nombre ?? null,
      subLoteId: t.subLoteId,
      sublote: t.sublote?.nombre ?? null,
      unidad: t.lote?.unidadProductiva?.nombre ?? null,
      fechaAplicacion: t.fechaAplicacion,
      responsable: t.responsable,
      producto: t.producto,
      dosis: t.dosis,
      metodoAplicacion: t.metodoAplicacion,
      contingenciaId: t.contingenciaId,
      contingencia: t.contingencia?.nombre ?? null,
      estado: t.estado,
      aprobacion: t.aprobacion,
      aprobadoPor: nombreDe(t.aprobadoPor),
      fechaAprobacion: t.fechaAprobacion,
      registradoPorId: t.registradoPorUsuarioId,
      // Lo creó y aprobó la misma persona (el administrador): no pasa por la bandeja de aprobaciones
      autoAprobado: t.registradoPorUsuarioId != null && t.registradoPorUsuarioId === t.aprobadoPorUsuarioId,
      observaciones: t.observaciones ?? "",
      costo: t.costo,
    };
  }

  async listarTratamientos() {
    const filas = await this.tratamientos.find({ relations: REL_TRATAMIENTO, order: { fechaAplicacion: "DESC", id: "DESC" } });
    return filas.map((t) => this.vistaTratamiento(t));
  }

  async obtenerTratamiento(id: number) {
    const fila = await this.tratamientos.findOne({ where: { id }, relations: REL_TRATAMIENTO });
    if (!fila) throw new NotFoundException(`El tratamiento con ID ${id} no existe`);
    return this.vistaTratamiento(fila);
  }

  async crearTratamiento(dto: CrearTratamientoDto, usuarioId: number) {
    const { loteId, subLoteId } = await this.ubicacion(dto);
    if (dto.contingenciaId !== undefined && !(await this.contingencias.findOne({ where: { id: dto.contingenciaId } }))) {
      throw new NotFoundException(`La contingencia con ID ${dto.contingenciaId} no existe`);
    }
    // El tratamiento de un encargado técnico nace pendiente de aprobación (RF14.5): el administrador
    // decide si lo puede aplicar. Los que crea el propio administrador no necesitan aprobación.
    const creador = await this.usuarios.findOne({ where: { id: usuarioId }, relations: { rol: true } });
    const loCreaAdmin = creador?.rol?.nombre === "ADMINISTRADOR" && creador.estado === "activo";
    const guardado = await this.tratamientos.save(
      this.tratamientos.create({
        nombre: dto.nombre.trim(),
        tipo: dto.tipo,
        cultivoId: dto.cultivoId,
        loteId: loteId ?? null,
        subLoteId: subLoteId ?? null,
        fechaAplicacion: dto.fechaAplicacion.slice(0, 10),
        responsable: dto.responsable.trim(),
        producto: dto.producto.trim(),
        dosis: dto.dosis.trim(),
        metodoAplicacion: dto.metodoAplicacion,
        contingenciaId: dto.contingenciaId ?? null,
        estado: dto.estado ?? "programado",
        aprobacion: loCreaAdmin ? "aprobado" : "pendiente",
        aprobadoPorUsuarioId: loCreaAdmin ? usuarioId : null,
        fechaAprobacion: loCreaAdmin ? new Date() : null,
        costo: dto.costo ?? 0,
        registradoPorUsuarioId: usuarioId,
      }),
    );
    return this.obtenerTratamiento(guardado.id);
  }

  async actualizarTratamiento(id: number, dto: ActualizarTratamientoDto) {
    const actual = await this.tratamientos.findOne({ where: { id } });
    if (!actual) throw new NotFoundException(`El tratamiento con ID ${id} no existe`);
    // Aprobado: ya no se corrige lo que se aprobó, solo avanza su estado (programado, en ejecución, seguimiento, finalizado)
    if (actual.aprobacion === "aprobado" && Object.entries(dto).some(([campo, valor]) => campo !== "estado" && valor !== undefined)) {
      throw new BadRequestException("Un tratamiento aprobado ya no se edita: solo se actualiza su estado");
    }

    const cambios: Partial<TratamientoOrmEntity> = {};
    if (dto.nombre !== undefined) cambios.nombre = dto.nombre.trim();
    if (dto.tipo !== undefined) cambios.tipo = dto.tipo;
    if (dto.fechaAplicacion !== undefined) cambios.fechaAplicacion = dto.fechaAplicacion.slice(0, 10);
    if (dto.responsable !== undefined) cambios.responsable = dto.responsable.trim();
    if (dto.producto !== undefined) cambios.producto = dto.producto.trim();
    if (dto.dosis !== undefined) cambios.dosis = dto.dosis.trim();
    if (dto.metodoAplicacion !== undefined) cambios.metodoAplicacion = dto.metodoAplicacion;
    if (dto.contingenciaId !== undefined) cambios.contingenciaId = dto.contingenciaId;
    if (dto.estado !== undefined) cambios.estado = dto.estado;
    if (dto.costo !== undefined) cambios.costo = dto.costo;
    // Un tratamiento rechazado que se corrige vuelve a quedar pendiente
    if (actual.aprobacion === "rechazado") Object.assign(cambios, { aprobacion: "pendiente", aprobadoPorUsuarioId: null, fechaAprobacion: null });
    await this.tratamientos.update(id, cambios);
    return this.obtenerTratamiento(id);
  }

  /** Solo el administrador aprueba o rechaza; queda quién y cuándo (RF2.5 / RF14.5). */
  async decidirAprobacion(id: number, dto: DecidirAprobacionDto, usuarioId: number) {
    const usuario = await this.usuarios.findOne({ where: { id: usuarioId }, relations: { rol: true } });
    if (usuario?.rol?.nombre !== "ADMINISTRADOR") throw new ForbiddenException("Solo el administrador puede aprobar o rechazar tratamientos");
    const actual = await this.tratamientos.findOne({ where: { id } });
    if (!actual) throw new NotFoundException(`El tratamiento con ID ${id} no existe`);
    if (actual.aprobacion !== "pendiente") throw new BadRequestException("Este tratamiento ya fue revisado");

    await this.tratamientos.update(id, {
      aprobacion: dto.decision,
      aprobadoPorUsuarioId: usuarioId,
      fechaAprobacion: new Date(),
      observaciones: dto.observaciones?.trim() || actual.observaciones,
    });
    return this.obtenerTratamiento(id);
  }
}
