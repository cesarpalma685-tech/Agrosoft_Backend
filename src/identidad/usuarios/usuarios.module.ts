import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from './infraestructure/persistence/usuario.orm-entity';
import { UsuarioTypeOrmRepository } from './infraestructure/repositories/usuario-typeorm.repository';
import { UsuarioRepository } from './aplication/ports/usuario.repository';
import { UsuariosController } from './infraestructure/controllers/usuarios.controller';
import { CrearUsuarioUseCase } from './aplication/use-cases/crear-usuario.usecase';
import { ActualizarUsuarioUseCase } from './aplication/use-cases/actualizar-usuario.usecase';
import { EliminarUsuarioUseCase } from './aplication/use-cases/eliminar-usuario.usecase';

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
