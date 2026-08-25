import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from './infraestructure/persistence/usuario.orm-entity';
import { UsuarioTypeOrmRepository } from './infraestructure/repositories/usuario-typeorm.repository';
import { USUARIO_REPOSITORY} from './aplication/ports/usuario.repository';
import { UsuariosController } from './infraestructure/controllers/usuarios.controller';
import { CrearUsuarioUseCase } from './aplication/use-cases/crear-usuario.usecase';
import { ActualizarUsuarioUseCase } from './aplication/use-cases/actualizar-usuario.usecase';
import { EliminarUsuarioUseCase } from './aplication/use-cases/eliminar-usuario.usecase';
import { AuthController } from './infraestructure/controllers/auth.controller';
import { LoginUseCase } from './aplication/use-cases/login.usecase';
import { AUTH_SERVICE_PORT } from './aplication/ports/auth-service.port';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './infraestructure/security/jwt-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infraestructure/security/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UsuarioOrmEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secreto_super_seguro',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController, UsuariosController],
  providers: [
    CrearUsuarioUseCase,
    ActualizarUsuarioUseCase,
    EliminarUsuarioUseCase,
    LoginUseCase,
    JwtStrategy,
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