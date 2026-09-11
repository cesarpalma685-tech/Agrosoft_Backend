import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";
import { CultivoHistorialOrmEntity } from "../persistence/cultivo-historial.orm-entity";
import { CultivoHistorialRepositoryPort } from "../../application/ports/cultivo-historial.repository.port";
import { CultivoHistorial } from "../../domain/entities/cultivo-historial.entity";

@Injectable()
export class CultivoHistorialTypeOrmRepository extends CultivoHistorialRepositoryPort {
  constructor(
    @InjectRepository(CultivoHistorialOrmEntity)
    private readonly repository: Repository<CultivoHistorialOrmEntity>,
  ) {
    super();
  }

  async save(cultivoHistorial: CultivoHistorial): Promise<CultivoHistorial> {
    const entity = this.repository.create(
      cultivoHistorial as Partial<CultivoHistorialOrmEntity>,
    );
    const saved = await this.repository.save(entity);
    return saved as unknown as CultivoHistorial;
  }

  async findAll(): Promise<CultivoHistorial[]> {
    const rows = await this.repository.find({ where: { deletedAt: IsNull() } });
    return rows as unknown as CultivoHistorial[];
  }

  async findByCultivoId(cultivoId: number): Promise<CultivoHistorial[]> {
    const rows = await this.repository.find({
      where: { cultivoId, deletedAt: IsNull() },
    });
    return rows as unknown as CultivoHistorial[];
  }
}
