import { Module } from "@nestjs/common";
import { UnidadesProductivasModule } from "./unidades_productivas/unidades-productivas.module";
import { LoteModule } from "./lotes/lotes.module";
import { SublotesModule } from "./sublotes/sublotes.module";

@Module({
  imports: [UnidadesProductivasModule, LoteModule, SublotesModule],
})
export class TerritorioModule {}
