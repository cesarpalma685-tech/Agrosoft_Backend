export class IotGlobalConfig {
  constructor(
    public readonly id: number | null,
    public readonly created_at: Date | null,
    public readonly updated_at: Date | null,
    public readonly deleted_at: Date | null,
    public readonly name: string,
    public readonly broker: string,
    public readonly port: number,
    public readonly protocol: string,
    public readonly topic_prefix: string,
    public readonly default_topics: string,
    public readonly custom_topics: string,
    public readonly lote_id: number,
    public readonly sub_lote_id: number,
    public readonly username: string,
    public readonly password: string,
    public readonly activo: boolean,
    public readonly default_sensors_initialized: boolean,
    public readonly auto_discover: boolean,
  ) {}
}
