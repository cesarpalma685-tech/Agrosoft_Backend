import { Module } from "@nestjs/common";
import { LoteModule } from "./lotes/lotes.module";
import { SublotesModule } from "./sublotes/sublotes.module";

@Module({
  imports: [LoteModule, SublotesModule],
})
export class TerritorioModule {}
