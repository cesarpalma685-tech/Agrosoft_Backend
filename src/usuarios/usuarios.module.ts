import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from '../../src/usuarios/infraestructure/persistence/usuario.orm-entity';
import { UsuarioTypeOrmRepository } from '../../src/usuarios/infraestructure/repositories/usuario-typeorm.repository';
import { UsuarioRepository } from './aplication/ports/usuario.repository';
import { UsuariosController } from '../../src/usuarios/infraestructure/controllers/usuarios.controller';
import { CrearUsuarioUseCase } from '../../src/usuarios/aplication/use-cases/crear-usuario.usecase';
import { ActualizarUsuarioUseCase } from '../../src/usuarios/aplication/use-cases/actualizar-usuario.usecase';
import { EliminarUsuarioUseCase } from '../../src/usuarios/aplication/use-cases/eliminar-usuario.usecase';

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