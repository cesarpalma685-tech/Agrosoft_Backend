import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";
import { LoteProduccionOrmEntity } from "../persistence/lote-produccion.orm-entity";
import { LoteProduccionRepositoryPort } from "../../application/ports/lote-produccion.repository.port";
import { LoteProduccion } from "../../domain/entities/lote-produccion.entity";

@Injectable()
export class LoteProduccionTypeOrmRepository extends LoteProduccionRepositoryPort {
  constructor(
    @InjectRepository(LoteProduccionOrmEntity)
    private readonly repository: Repository<LoteProduccionOrmEntity>,
  ) {
    super();
  }

  async save(loteProduccion: LoteProduccion): Promise<LoteProduccion> {
    const entity = this.repository.create(
      loteProduccion as Partial<LoteProduccionOrmEntity>,
    );
    const saved = await this.repository.save(entity);
    return saved as unknown as LoteProduccion;
  }

  async findAll(): Promise<LoteProduccion[]> {
    const rows = await this.repository.find({ where: { deletedAt: IsNull() } });
    return rows as unknown as LoteProduccion[];
  }

  async findByCultivoId(cultivoId: number): Promise<LoteProduccion[]> {
    const rows = await this.repository.find({ where: { cultivoId, deletedAt: IsNull() } });
    return rows as unknown as LoteProduccion[];
  }

  async update(id: number, cambios: Partial<LoteProduccion>): Promise<LoteProduccion | null> {
    await this.repository.update(id, cambios as Partial<LoteProduccionOrmEntity>);
    return await this.findById(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findById(id: number): Promise<LoteProduccion | null> {
    const row = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    return row as unknown as LoteProduccion | null;
  }
}
