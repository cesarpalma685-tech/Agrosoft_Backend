import { Cultivo } from '../../domain/entities/cultivo.entity';

export abstract class CultivoRepositoryPort {
  abstract save(cultivo: Cultivo): Promise<Cultivo>;
  abstract findAll(): Promise<Cultivo[]>;
  abstract findById(id: number): Promise<Cultivo | null>;
}