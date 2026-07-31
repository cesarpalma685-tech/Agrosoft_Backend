import { Cultivo } from './cultivo.entity';

export interface CultivoRepository {
  save(cultivo: Cultivo): Promise<Cultivo>;
  findAll(): Promise<Cultivo[]>;
  findById(id: number): Promise<Cultivo | null>;
}

export const CULTIVO_REPOSITORY = Symbol('CULTIVO_REPOSITORY');