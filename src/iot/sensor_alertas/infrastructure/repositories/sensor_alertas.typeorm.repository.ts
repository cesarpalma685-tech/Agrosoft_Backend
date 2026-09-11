import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SensorAlertasRepositoryPort } from "../../application/ports/sensor_alertas.repository.port";
import { SensorAlertas } from "../../domain/entities/sensor_alertas.dto";
import { SensorAlertasPersistence } from "../persistence/sensor_alertas.orm-entity";

@Injectable()
export class SensorAlertasRepository implements SensorAlertasRepositoryPort {
  constructor(
    @InjectRepository(SensorAlertasPersistence)
    private readonly repository: Repository<SensorAlertasPersistence>,
  ) {}

  async crear(sensorAlertas: SensorAlertas): Promise<SensorAlertas> {
    const alerta = this.repository.create({
      sensor_id: sensorAlertas.sensor_id,
      valor: sensorAlertas.valor,
      umbral: sensorAlertas.umbral,
      tipo: sensorAlertas.tipo,
      fecha_alerta: sensorAlertas.fecha_alerta,
      lote_id: sensorAlertas.lote_id,
      sub_lote_id: sensorAlertas.sub_lote_id,
    });

    const guardada = await this.repository.save(alerta);

    return this.toDomain(guardada);
  }

  async listar(): Promise<SensorAlertas[]> {
    const alertas = await this.repository.find();

    return alertas.map((alerta) => this.toDomain(alerta));
  }

  async buscarPorId(id: number): Promise<SensorAlertas | null> {
    const alerta = await this.repository.findOne({
      where: { id },
    });

    return alerta ? this.toDomain(alerta) : null;
  }

  async actualizar(
    id: number,
    datos: Partial<SensorAlertas>,
  ): Promise<SensorAlertas | null> {
    const datosActualizados = {
      sensor_id: datos.sensor_id,
      valor: datos.valor,
      umbral: datos.umbral,
      tipo: datos.tipo,
      fecha_alerta: datos.fecha_alerta,
      lote_id: datos.lote_id,
      sub_lote_id: datos.sub_lote_id,
    };

    await this.repository.update(id, datosActualizados);

    const actualizada = await this.repository.findOne({
      where: { id },
    });

    return actualizada ? this.toDomain(actualizada) : null;
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  private toDomain(alerta: SensorAlertasPersistence): SensorAlertas {
    return new SensorAlertas(
      alerta.id,
      alerta.created_at,
      alerta.updated_at,
      alerta.deleted_at,
      alerta.sensor_id,
      alerta.valor,
      alerta.umbral,
      alerta.tipo,
      alerta.fecha_alerta,
      alerta.lote_id,
      alerta.sub_lote_id,
    );
  }
}
