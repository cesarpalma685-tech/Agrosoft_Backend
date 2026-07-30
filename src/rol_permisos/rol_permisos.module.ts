import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolPermisoOrmEntity } from './infrastructure/persistence/rol_permisos.orm-entity';
import { RolPermisoTypeOrmRepository } from './infrastructure/persistence/rol_permisos-typeorm.repository';
import { RolPermisoRepository } from './domain/rol_permisos.repository';

@Module({
imports: [
    TypeOrmModule.forFeature([RolPermisoOrmEntity]),
],
providers: [
    {
    provide: RolPermisoRepository,
    useClass: RolPermisoTypeOrmRepository,
    },
],
exports: [
    RolPermisoRepository,
],
})
export class RolPermisoModule {}