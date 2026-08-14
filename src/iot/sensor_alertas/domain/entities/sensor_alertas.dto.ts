export class SensorAlertas {
  constructor(
    public readonly id: number | null,
    public readonly created_at: Date | null,
    public readonly updated_at: Date | null,
    public readonly deleted_at: Date | null,
    public readonly sensor_id: number,
    public readonly valor: number,
    public readonly umbral: number,
    public readonly tipo: string,
    public readonly fecha_alerta: Date,
    public readonly lote_id: number,
    public readonly sub_lote_id: number,
  ) {}
}