import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { UsuarioOrmEntity } from "../infraestructure/persistence/usuario.orm-entity";
import { RolOrmEntity } from "../../roles/infraestructure/persistence/rol.orm-entity";
import { ROL_NOMBRE_LABELS, RolNombre } from "../../roles/domain/enums/rol-nombre.enum";
import { PROGRAMA_FORMACION_LABELS } from "../../../formacion/programas-formacion/domain/enums/programa-formacion-nombre.enum";
import { ActualizarUsuarioAdminDto } from "./dto/actualizar-usuario-admin.dto";

const CAMPOS_PROPIOS = ["nombre", "apellido", "telefono", "fotoPerfil"];

@Injectable()
export class GestionUsuariosService {
  constructor(
    @InjectRepository(UsuarioOrmEntity) private readonly usuarios: Repository<UsuarioOrmEntity>,
    @InjectRepository(RolOrmEntity) private readonly roles: Repository<RolOrmEntity>,
  ) {}

  // Nunca el hash de la contraseña ni la foto (pesa; viene en el login)
  private vista(u: UsuarioOrmEntity) {
    return {
      id: u.id,
      nombre: u.nombre,
      apellido: u.apellido,
      correo: u.correo,
      telefono: u.telefono,
      identificacion: u.identificacion,
      estado: u.estado,
      rol: u.rol?.nombre ?? null,
      rolLabel: u.rol ? ROL_NOMBRE_LABELS[u.rol.nombre] : null,
      programaFormacion: u.programaFormacion,
      programaLabel: u.programaFormacion ? PROGRAMA_FORMACION_LABELS[u.programaFormacion] : null,
      idFicha: u.idFicha,
      ultimoIngreso: u.lastLoginAt,
      creadoEn: u.created_at,
    };
  }

  async listar() {
    const filas = await this.usuarios.find({ relations: { rol: true }, order: { id: "ASC" } });
    return filas.map((u) => this.vista(u));
  }

  private async esAdministrador(id: number) {
    const u = await this.usuarios.findOne({ where: { id }, relations: { rol: true } });
    return u?.rol?.nombre === RolNombre.ADMINISTRADOR && u.estado === "activo";
  }

  private async otrosAdministradoresActivos(excluirId: number) {
    return this.usuarios.count({ where: { id: Not(excluirId), estado: "activo", rol: { nombre: RolNombre.ADMINISTRADOR } } });
  }

  async actualizar(id: number, dto: ActualizarUsuarioAdminDto, solicitanteId: number) {
    const usuario = await this.usuarios.findOne({ where: { id }, relations: { rol: true } });
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);

    const admin = await this.esAdministrador(solicitanteId);
    if (!admin) {
      if (id !== solicitanteId) throw new ForbiddenException("Solo puedes editar tu propio perfil");
      const ajenos = Object.keys(dto).filter((k) => !CAMPOS_PROPIOS.includes(k) && (dto as Record<string, unknown>)[k] !== undefined);
      if (ajenos.length > 0) throw new ForbiddenException("Solo el administrador puede cambiar: " + ajenos.join(", "));
    }

    const eraAdmin = usuario.rol?.nombre === RolNombre.ADMINISTRADOR;
    // No quedarse sin administradores
    if (eraAdmin && ((dto.estado === "inactivo") || (dto.rol !== undefined && dto.rol !== RolNombre.ADMINISTRADOR))) {
      if ((await this.otrosAdministradoresActivos(id)) === 0) {
        throw new BadRequestException("Debe quedar al menos un administrador activo");
      }
    }
    if (id === solicitanteId && dto.estado === "inactivo") throw new BadRequestException("No puedes desactivar tu propia cuenta");

    if (dto.correo !== undefined && dto.correo !== usuario.correo) {
      if (await this.usuarios.findOne({ where: { correo: dto.correo, id: Not(id) }, withDeleted: true })) throw new ConflictException("Ya existe un usuario con ese correo");
      usuario.correo = dto.correo;
    }
    if (dto.identificacion !== undefined && dto.identificacion !== usuario.identificacion) {
      if (await this.usuarios.findOne({ where: { identificacion: dto.identificacion, id: Not(id) }, withDeleted: true })) throw new ConflictException("Ya existe un usuario con esa identificación");
      usuario.identificacion = dto.identificacion;
    }
    if (dto.rol !== undefined && dto.rol !== usuario.rol?.nombre) {
      const rol = await this.roles.findOne({ where: { nombre: dto.rol } });
      if (!rol) throw new BadRequestException(`El rol ${dto.rol} no existe`);
      usuario.rolId = rol.id;
      usuario.rol = rol;
    }
    if (dto.nombre !== undefined) usuario.nombre = dto.nombre.trim();
    if (dto.apellido !== undefined) usuario.apellido = dto.apellido.trim();
    if (dto.telefono !== undefined) usuario.telefono = dto.telefono.trim() || null;
    if (dto.fotoPerfil !== undefined) usuario.fotoPerfil = dto.fotoPerfil;
    if (dto.estado !== undefined) usuario.estado = dto.estado;
    if (dto.programaFormacion !== undefined) usuario.programaFormacion = dto.programaFormacion;
    if (dto.idFicha !== undefined) usuario.idFicha = dto.idFicha;

    if (usuario.rol?.nombre === RolNombre.APRENDIZ && !usuario.programaFormacion) {
      throw new BadRequestException("El programa de formación es obligatorio para un Aprendiz");
    }

    await this.usuarios.save(usuario);
    return this.vista(usuario);
  }

  async eliminar(id: number, solicitanteId: number) {
    const usuario = await this.usuarios.findOne({ where: { id }, relations: { rol: true } });
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);
    if (id === solicitanteId) throw new BadRequestException("No puedes eliminar tu propia cuenta");
    if (usuario.rol?.nombre === RolNombre.ADMINISTRADOR && (await this.otrosAdministradoresActivos(id)) === 0) {
      throw new BadRequestException("Debe quedar al menos un administrador activo");
    }
    await this.usuarios.softDelete(id);
  }
}
