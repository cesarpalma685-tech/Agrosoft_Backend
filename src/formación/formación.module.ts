import { Module } from '@nestjs/common';
import { ProgramaFormacionModule } from './programas-formacion/programas-formacion.module';

@Module({
    imports:[ProgramaFormacionModule]
})
export class FormaciónModule {}
