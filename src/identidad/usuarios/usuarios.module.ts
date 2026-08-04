import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from './infrastructure/persistence/usuario.orm-entity';
import { UsuarioTypeOrmRepository } from './infrastructure/persistence/usuario-typeorm.repository';
import { UsuarioRepository } from './domain/usuario.repository';
import { UsuariosController } from './infrastructure/http/usuarios.controller';
import { CrearUsuarioUseCase } from './application/use-cases/crear-usuario.usecase';
import { ActualizarUsuarioUseCase } from './application/use-cases/actualizar-usuario.usecase';
import { EliminarUsuarioUseCase } from './application/use-cases/eliminar-usuario.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuariosController],
  providers: [
    CrearUsuarioUseCase,
    ActualizarUsuarioUseCase,
    EliminarUsuarioUseCase,
    {
      provide: UsuarioRepository,
      useClass: UsuarioTypeOrmRepository,
    },
  ],
  exports: [ UsuarioRepository ],
})
export class UsuariosModule {}