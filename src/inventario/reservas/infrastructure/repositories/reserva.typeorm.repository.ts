import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReservaOrmEntity } from "../persistence/reserva.orm-entity";
import { ReservaRepositoryPort } from "../../aplication/ports/reserva.repository.port";
import { Reserva } from "../../domain/entities/crear-reserva.dto";

@Injectable()
export class ReservaTypeOrmRepository extends ReservaRepositoryPort {
  constructor(
    @InjectRepository(ReservaOrmEntity)
    private readonly repository: Repository<ReservaOrmEntity>,
  ) {
    super();
  }

  async save(reserva: Reserva): Promise<Reserva> {
    const entity = this.repository.create(reserva as Partial<ReservaOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved;
  }

  async findById(id: number): Promise<Reserva | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async findAll(): Promise<Reserva[]> {
    const entities = await this.repository.find();
    return entities;
  }

  async update(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
    await this.repository.update(id, reserva);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }
    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
