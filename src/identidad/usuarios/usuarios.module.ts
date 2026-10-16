import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioOrmEntity } from "./infraestructure/persistence/usuario.orm-entity";
import { UsuarioTypeOrmRepository } from "./infraestructure/repositories/usuario-typeorm.repository";
import { USUARIO_REPOSITORY } from "./aplication/ports/usuario.repository";
import { UsuariosController } from "./infraestructure/controllers/usuarios.controller";
import { CrearUsuarioUseCase } from "./aplication/use-cases/crear-usuario.usecase";
import { ActualizarUsuarioUseCase } from "./aplication/use-cases/actualizar-usuario.usecase";
import { EliminarUsuarioUseCase } from "./aplication/use-cases/eliminar-usuario.usecase";
import { AuthController } from "./infraestructure/controllers/auth.controller";
import { LoginUseCase } from "./aplication/use-cases/login.usecase";
import { CambiarPasswordUseCase } from "./aplication/use-cases/cambiar-password.usecase";
import { AUTH_SERVICE_PORT } from "./aplication/ports/auth-service.port";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthService } from "./infraestructure/security/jwt-auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./infraestructure/security/jwt.strategy";
import { RolModule } from "../roles/roles.module";
import { AdminSeeder } from "./infraestructure/seeders/admin.seeder";
import { EmailCodeModule } from "../mail-codes/mail-codes.module";
import { SolicitarRecuperacionUseCase } from "./aplication/use-cases/solicitar-recuperacion.usecase";
import { RestablecerPasswordUseCase } from "./aplication/use-cases/restablecer-password.usecase";
import { EMAIL_SENDER_PORT } from "./aplication/ports/email-sender.port";
import { NodemailerEmailService } from "./infraestructure/mail/nodemailer-email.service";

@Module({
  imports: [
    PassportModule,
    RolModule,
    EmailCodeModule,
    TypeOrmModule.forFeature([UsuarioOrmEntity]),
    // registerAsync: el secreto se lee cuando ConfigModule ya cargó el .env.
    // Con register() se leía al importar el archivo (antes del .env), así que
    // el token se firmaba con el valor por defecto y JwtStrategy lo rechazaba (401).
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || "secreto_super_seguro",
        signOptions: { expiresIn: "24h" },
      }),
    }),
  ],
  controllers: [AuthController, UsuariosController],
  providers: [
    CrearUsuarioUseCase,
    ActualizarUsuarioUseCase,
    EliminarUsuarioUseCase,
    LoginUseCase,
    CambiarPasswordUseCase,
    SolicitarRecuperacionUseCase,
    RestablecerPasswordUseCase,
    { provide: EMAIL_SENDER_PORT, useClass: NodemailerEmailService },
    JwtStrategy,
    AdminSeeder,
    {
      provide: AUTH_SERVICE_PORT,
      useClass: JwtAuthService,
    },
    {
      provide: USUARIO_REPOSITORY, // <-- AQUÍ: Debe decir USUARIO_REPOSITORY
      useClass: UsuarioTypeOrmRepository,
    },
  ],
  exports: [AUTH_SERVICE_PORT, JwtModule],
})
export class UsuariosModule {}
