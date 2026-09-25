// import { Injectable } from '@nestjs/common';
// import * as crypto from 'crypto';
// import { EmailCodeRepository } from '../../../mail-codes/aplication/ports/mail-codes.repository';
// import { EmailCode } from '../../../mail-codes/domain/entities/mail-codes.entity';
// import { UsuarioRepository } from 'src/identidad/usuarios/aplication/ports/usuario.repository';


// @Injectable()
// export class SolicitarRecuperacionUseCase {
//   constructor(
//     private readonly usuarioRepo: UsuarioRepository,
//     private readonly mailCodeRepo: EmailCodeRepository,
//     private readonly emailSender: EmailSenderPort,
//   ) {}

//   async ejecutar(correo: string): Promise<{ mensaje: string }> {
//     const usuario = await this.usuarioRepo.buscarPorCorreo(correo);

//     // Protección contra enumeración de usuarios
//     if (!usuario) {
//       return { mensaje: 'Si el correo está registrado, recibirás un enlace de recuperación.' };
//     }

//     // 1. Generar token único y expiración (30 minutos)
//     const token = crypto.randomBytes(32).toString('hex');
//     const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

//     // 2. Instanciar la entidad de dominio EmailCode
//     // (id, usuarioId, tipo, code, expiresAt, usedAt, created_at)
//     const nuevoCodigo = new EmailCode(
//       null as any, // ID autogenerado por la BD
//       usuario.id!,
//       'recuperacion_password',
//       token,
//       expiresAt,
//       undefined,
//       new Date(),
//     );

//     // 3. Guardar mediante el puerto del repositorio
//     await this.mailCodeRepo.crear(nuevoCodigo);

//     // 4. Construir enlace para el Frontend
//     const urlFrontend = process.env.FRONTEND_URL || 'http://localhost:5173';
//     const enlace = `${urlFrontend}/restablecer-password?token=${token}`;

//     // 5. Enviar el correo
//     await this.emailSender.enviarEnlaceRecuperacion(usuario.correo, enlace);

//     return { mensaje: 'Si el correo está registrado, recibirás un enlace de recuperación.' };
//   }
// }