import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { CrearEmailCodeUseCase } from "../../aplication/use-cases/crear-mail-codes.usecase";
import { ActualizarEmailCodeUseCase } from "../../aplication/use-cases/actualizar-mail-codes.usecase";
import { EliminarEmailCodeUseCase } from "../../aplication/use-cases/eliminar-mail-codes.usecase";

import { CreateEmailCodeDto } from "../../aplication/dto/create-mail-codes.dto";
import { UpdateEmailCodeDto } from "../../aplication/dto/update-mail-codes.dto";

@Controller("email-codes")
export class EmailCodesController {
  constructor(
    private readonly crearEmailCode: CrearEmailCodeUseCase,
    private readonly actualizarEmailCode: ActualizarEmailCodeUseCase,
    private readonly eliminarEmailCode: EliminarEmailCodeUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreateEmailCodeDto) {
    return this.crearEmailCode.ejecutar(dto);
  }

  @Patch(":id")
  actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateEmailCodeDto,
  ) {
    return this.actualizarEmailCode.ejecutar(id, dto);
  }

  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminarEmailCode.ejecutar(id);
  }
}
