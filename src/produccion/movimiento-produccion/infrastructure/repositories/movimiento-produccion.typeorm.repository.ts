import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";
import { MovimientoProduccionOrmEntity } from "../persistence/movimiento-produccion.orm-entity";
import { LoteProduccionOrmEntity } from "../../../lote-produccion/infrastructure/persistence/lote-produccion.orm-entity";
import { MovimientoProduccionRepositoryPort } from "../../application/ports/movimiento-produccion.repository.port";
import { MovimientoProduccion } from "../../domain/entities/movimiento-produccion.entity";

@Injectable()
export class MovimientoProduccionTypeOrmRepository extends MovimientoProduccionRepositoryPort {
  constructor(
    @InjectRepository(MovimientoProduccionOrmEntity)
    private readonly repository: Repository<MovimientoProduccionOrmEntity>,
    @InjectRepository(LoteProduccionOrmEntity)
    private readonly loteProduccionRepository: Repository<LoteProduccionOrmEntity>,
  ) {
    super();
  }

  async save(
    movimientoProduccion: MovimientoProduccion,
  ): Promise<MovimientoProduccion> {
    const entity = this.repository.create(
      movimientoProduccion as Partial<MovimientoProduccionOrmEntity>,
    );
    const saved = await this.repository.save(entity);
    return saved as unknown as MovimientoProduccion;
  }

  async findAll(): Promise<MovimientoProduccion[]> {
    const rows = await this.repository.find({ where: { deletedAt: IsNull() } });
    return rows as unknown as MovimientoProduccion[];
  }

  async getStockDisponible(loteProduccionId: number): Promise<number | null> {
    const lote = await this.loteProduccionRepository.findOne({
      where: { id: loteProduccionId },
    });
    return lote ? lote.stockDisponibleKg : null;
  }

  async descontarStock(loteProduccionId: number, delta: number): Promise<void> {
    const lote = await this.loteProduccionRepository.findOne({
      where: { id: loteProduccionId },
    });
    if (!lote) return;
    lote.stockDisponibleKg = lote.stockDisponibleKg + delta;
    await this.loteProduccionRepository.save(lote);
  }
}
