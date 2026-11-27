import { Module } from "@nestjs/common";
import { EliminacionTerritorioService } from "./eliminacion-territorio.service";

@Module({
  providers: [EliminacionTerritorioService],
  exports: [EliminacionTerritorioService],
})
export class EliminacionTerritorioModule {}
