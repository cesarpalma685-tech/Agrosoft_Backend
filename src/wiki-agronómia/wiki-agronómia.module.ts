import { Module } from '@nestjs/common';
import { WikiTipoEpaModule } from './wiki-tipo-epa/wiki-tipo-epa.module';
import { TipoCultivoWikiModule } from './tipo-cultivo-wiki/tipo-cultivo-wiki.module';

@Module({
    imports:[WikiTipoEpaModule, TipoCultivoWikiModule]
})
export class WikiAgronómiaModule {}
