import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../aplication/use-cases/crear-usuario.usecase';
import { ActualizarUsuarioUseCase } from '../../aplication/use-cases/actualizar-usuario.usecase';
import { EliminarUsuarioUseCase } from '../../aplication/use-cases/eliminar-usuario.usecase';
import { CreateUsuarioDto } from '../../aplication/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../../aplication/dto/update-usuario.dto';
import { JwtAuthGuard } from '../security/jwt-auth.guard';


@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly crearUsuario: CrearUsuarioUseCase,
    private readonly actualizarUsuario: ActualizarUsuarioUseCase,
    private readonly eliminarUsuario: EliminarUsuarioUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.crearUsuario.ejecutar(dto);
  }

// PROTEGIDO: Requiere token JWT
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto) {
    return this.actualizarUsuario.ejecutar(id, dto);
  }

  // PROTEGIDO: Requiere token JWT
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarUsuario.ejecutar(id);
  }
}