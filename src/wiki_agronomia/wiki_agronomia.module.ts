import { Module } from "@nestjs/common";
import { TipoCultivoWikiModule } from "./tipo-cultivo-wiki/tipo-cultivo-wiki.module";
import { WikiTipoEpaModule } from "./wiki-tipo-epa/wiki-tipo-epa.module";

@Module({
  imports: [TipoCultivoWikiModule, WikiTipoEpaModule],
})
export class WikiAgronomiaModule {}
