import { Module } from "@nestjs/common";
import { ProgramaFormacionModule } from "./programas-formacion/programas-formacion.module";
import { TiposFormacionModule } from "./tipos-formacion/tipos-formacion.module";

@Module({
  imports: [ProgramaFormacionModule, TiposFormacionModule],
})
export class FormacionModule {}
