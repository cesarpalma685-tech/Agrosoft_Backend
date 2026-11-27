import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { EmailCodeRepository } from "../../mail-codes/aplication/ports/mail-codes.repository";
import { EmailCode } from "../../mail-codes/domain/entities/mail-codes.entity";
import { RolRepository } from "../../roles/aplication/ports/rol.repository";
import { RolNombre } from "../../roles/domain/enums/rol-nombre.enum";
import { Usuario } from "../domain/entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { CrearUsuarioUseCase } from "./use-cases/crear-usuario.usecase";
import { EMAIL_SENDER_PORT, EmailSenderPort } from "./ports/email-sender.port";
import { USUARIO_REPOSITORY, UsuarioRepository } from "./ports/usuario.repository";

export const TIPO_VERIFICACION = "verificacion_correo";
const MINUTOS_VIGENCIA = 10;
const MAX_INTENTOS = 5;
const SEGUNDOS_ENTRE_ENVIOS = 60;
// Sin 0/O ni 1/I para que no se confundan al leer el correo
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const hashCodigo = (usuarioId: number, codigo: string) =>
  crypto.createHash("sha256").update(`${usuarioId}:${codigo.toUpperCase()}`).digest("hex");

const generarCodigo = () => Array.from({ length: 6 }, () => ALFABETO[crypto.randomInt(ALFABETO.length)]).join("");

const CODIGO_INVALIDO = "El código no es válido o ya venció. Solicita uno nuevo.";

@Injectable()
export class VerificacionCorreoService {
  private readonly logger = new Logger(VerificacionCorreoService.name);

  constructor(
    @Inject(USUARIO_REPOSITORY) private readonly usuarios: UsuarioRepository,
    private readonly crearUsuario: CrearUsuarioUseCase,
    private readonly codigos: EmailCodeRepository,
    private readonly roles: RolRepository,
    @Inject(EMAIL_SENDER_PORT) private readonly correo: EmailSenderPort,
  ) {}

  /** Registro público: la cuenta queda "pendiente" hasta confirmar el correo con el código. */
  async registrar(dto: CreateUsuarioDto): Promise<{ mensaje: string; correo: string }> {
    const correo = dto.correo.trim().toLowerCase();
    const existente = await this.usuarios.buscarPorCorreo(correo);

    let usuario: Usuario;
    if (existente && existente.estado === "pendiente") {
      // Se registró antes y nunca confirmó: se actualizan sus datos y se envía un código nuevo
      usuario = await this.actualizarPendiente(existente, dto);
    } else {
      // Si ya existe una cuenta activa, lanza 409
      usuario = await this.crearUsuario.ejecutar({ ...dto, correo }, { estadoInicial: "pendiente" });
    }

    await this.enviarCodigo(usuario);
    return { mensaje: "Te enviamos un código de 6 caracteres para verificar tu correo.", correo };
  }

  async verificar(correoRaw: string, codigoRaw: string): Promise<{ mensaje: string }> {
    const usuario = await this.usuarios.buscarPorCorreo(correoRaw.trim().toLowerCase());
    if (!usuario || usuario.id === null || usuario.estado !== "pendiente") {
      throw new BadRequestException([CODIGO_INVALIDO]);
    }

    const registro = await this.codigos.buscarUltimo(usuario.id, TIPO_VERIFICACION);
    if (!registro || registro.usedAt || registro.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException([CODIGO_INVALIDO]);
    }
    if (registro.intentos >= MAX_INTENTOS) {
      throw new BadRequestException(["Demasiados intentos fallidos. Solicita un código nuevo."]);
    }

    if (registro.code !== hashCodigo(usuario.id, codigoRaw.trim())) {
      registro.intentos += 1;
      await this.codigos.actualizar(registro);
      const restantes = MAX_INTENTOS - registro.intentos;
      throw new BadRequestException([
        restantes > 0 ? `Código incorrecto. Te quedan ${restantes} intento(s).` : "Demasiados intentos fallidos. Solicita un código nuevo.",
      ]);
    }

    registro.usedAt = new Date();
    await this.codigos.actualizar(registro);
    usuario.estado = "activo";
    usuario.emailVerifiedAt = new Date();
    await this.usuarios.actualizar(usuario);
    return { mensaje: "Correo verificado. Ya puedes iniciar sesión." };
  }

  async reenviar(correoRaw: string): Promise<{ mensaje: string }> {
    const mensaje = "Si el correo tiene una verificación pendiente, enviamos un código nuevo.";
    const usuario = await this.usuarios.buscarPorCorreo(correoRaw.trim().toLowerCase());
    // Misma respuesta exista o no la cuenta, para no revelar qué correos están registrados
    if (!usuario || usuario.id === null || usuario.estado !== "pendiente") return { mensaje };

    const ultimo = await this.codigos.buscarUltimo(usuario.id, TIPO_VERIFICACION);
    if (ultimo?.createdAt && Date.now() - ultimo.createdAt.getTime() < SEGUNDOS_ENTRE_ENVIOS * 1000) {
      throw new HttpException(
        [`Espera ${SEGUNDOS_ENTRE_ENVIOS} segundos antes de pedir otro código.`],
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    await this.enviarCodigo(usuario);
    return { mensaje };
  }

  private async actualizarPendiente(usuario: Usuario, dto: CreateUsuarioDto): Promise<Usuario> {
    const rolNombre = dto.rol ?? RolNombre.APRENDIZ;
    const rol = await this.roles.buscarPorNombre(rolNombre);
    if (!rol) throw new BadRequestException(`Rol no permitido: ${rolNombre}`);

    usuario.nombre = dto.nombre;
    usuario.apellido = dto.apellido;
    usuario.identificacion = dto.identificacion;
    usuario.telefono = dto.telefono ?? null;
    usuario.fotoPerfil = dto.fotoPerfil ?? null;
    usuario.programaFormacion = dto.programaFormacion ?? null;
    usuario.idFicha = dto.idFicha ?? null;
    usuario.rolId = rol.id;
    usuario.passwordHash = await bcrypt.hash(dto.password, 10);
    return this.usuarios.actualizar(usuario);
  }

  private async enviarCodigo(usuario: Usuario): Promise<void> {
    if (usuario.id === null) return;
    const codigo = generarCodigo();
    await this.codigos.crear(
      new EmailCode(null, usuario.id, TIPO_VERIFICACION, hashCodigo(usuario.id, codigo), new Date(Date.now() + MINUTOS_VIGENCIA * 60_000)),
    );
    try {
      await this.correo.enviarCodigoVerificacion(usuario.correo, codigo, MINUTOS_VIGENCIA);
    } catch (error) {
      this.logger.error(`No se pudo enviar el código a ${usuario.correo}`, error as Error);
      throw new ServiceUnavailableException(
        "No pudimos enviar el correo de verificación. Revisa que el correo esté bien escrito e intenta reenviar el código en un momento.",
      );
    }
  }
}
