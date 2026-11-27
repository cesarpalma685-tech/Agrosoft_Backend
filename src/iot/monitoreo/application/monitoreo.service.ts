import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";
import * as net from "net";
import { SensorOrmEntity } from "../../sensores/infrastructure/persistence/sensores.orm-entity";
import { SensorLecturasOrmEntity } from "../../sensor_lecturas/infrastructure/persistence/sensor_lecturas.orm-entity";
import { SensorAlertasPersistence } from "../../sensor_alertas/infrastructure/persistence/sensor_alertas.orm-entity";
import { TiposSensoresOrmEntity } from "../../tipos_sensores/infrastructure/persistence/tipos_sensores.orm-entity";
import { IotGlobalConfigPersistence } from "../../iot_global_config/infrastructure/persistence/iot_global_config.orm-entity";
import { ActualizarSensorDto, CrearSensorDto, GuardarConfigDto, RegistrarLecturaDto } from "./dto/monitoreo.dto";
import { cifrar } from "./utils/cifrado";

const RELACIONES = {
  tipoSensor: true,
  lote: { unidadProductiva: true },
  sublote: true,
  cultivo: true,
  globalConfig: true,
} as const;

type Condicion = "Normal" | "Exceso" | "Déficit";

const numero = (v: unknown): number | null => (v === null || v === undefined || v === "" ? null : Number(v));
const redondear = (v: number) => Math.round((v + Number.EPSILON) * 1000) / 1000;

function condicionDe(valor: number, min: number | null, max: number | null): Condicion {
  if (max !== null && valor > max) return "Exceso";
  if (min !== null && valor < min) return "Déficit";
  return "Normal";
}

@Injectable()
export class MonitoreoIotService {
  constructor(
    @InjectRepository(SensorOrmEntity) private readonly sensores: Repository<SensorOrmEntity>,
    @InjectRepository(SensorLecturasOrmEntity) private readonly lecturas: Repository<SensorLecturasOrmEntity>,
    @InjectRepository(SensorAlertasPersistence) private readonly alertas: Repository<SensorAlertasPersistence>,
    @InjectRepository(TiposSensoresOrmEntity) private readonly tipos: Repository<TiposSensoresOrmEntity>,
    @InjectRepository(IotGlobalConfigPersistence) private readonly configs: Repository<IotGlobalConfigPersistence>,
  ) {}

  /* ───────── Sensores ───────── */

  private async vistaSensor(s: SensorOrmEntity) {
    const min = numero(s.valor_minimo_sensor);
    const max = numero(s.valor_maximo_sensor);
    const ultimo = numero(s.ultimo_valor);
    const ttlMs = (s.tipoSensor?.ttl_minutos ?? 10) * 60_000;
    // Conectado si llegó una lectura dentro del tiempo de vida del tipo de sensor (RF10.5)
    const conectado = s.activo && !!s.ultima_medicion && Date.now() - new Date(s.ultima_medicion).getTime() <= ttlMs;
    const condicion: Condicion | "Sin datos" = !conectado || ultimo === null ? "Sin datos" : condicionDe(ultimo, min, max);
    const recientes = await this.lecturas.find({ where: { sensor_id: s.id }, order: { fecha_lectura: "DESC" }, take: 8 });

    return {
      id: s.id,
      codigo: s.codigo,
      nombre: s.nombre_sensor,
      tipo: s.tipoSensor
        ? { id: s.tipoSensor.id, nombre: s.tipoSensor.nombre, unidad: s.tipoSensor.unidad, decimales: s.tipoSensor.decimales, ttlMinutos: s.tipoSensor.ttl_minutos }
        : null,
      protocolo: s.protocolo,
      endpointUrl: s.endpoint_url,
      mqttTopic: s.mqtt_topic,
      min,
      max,
      activo: s.activo,
      cultivoId: s.cultivoId,
      cultivo: s.cultivo?.nombreCultivo ?? null,
      loteId: s.lote_id,
      lote: s.lote?.nombre ?? null,
      unidadProductivaId: s.lote?.unidad_productiva_id ?? null,
      unidadProductiva: s.lote?.unidadProductiva?.nombre ?? null,
      subLoteId: s.sub_lote_id,
      sublote: s.sublote?.nombre ?? null,
      globalConfigId: s.global_config_id,
      configuracion: s.globalConfig?.name ?? null,
      ultimoValor: ultimo,
      ultimaMedicion: s.ultima_medicion,
      visto: s.last_seen_at,
      conectado,
      condicion,
      estado: !conectado ? "offline" : condicion === "Normal" ? "range" : "alert",
      lecturasRecientes: recientes.map((l) => Number(l.valor)).reverse(),
    };
  }

  async listarSensores() {
    const filas = await this.sensores.find({ relations: RELACIONES, order: { id: "ASC" } });
    return Promise.all(filas.map((s) => this.vistaSensor(s)));
  }

  async obtenerSensor(id: number) {
    const fila = await this.sensores.findOne({ where: { id }, relations: RELACIONES });
    if (!fila) throw new NotFoundException(`El sensor con ID ${id} no existe`);
    return this.vistaSensor(fila);
  }

  private validarRango(min: number | null | undefined, max: number | null | undefined) {
    if (min != null && max != null && min >= max) throw new BadRequestException("El valor mínimo del rango debe ser menor al máximo");
  }

  async crearSensor(dto: CrearSensorDto, usuarioId: number) {
    const tipo = await this.tipos.findOne({ where: { id: dto.tipo_sensor_id } });
    if (!tipo) throw new NotFoundException(`El tipo de sensor con ID ${dto.tipo_sensor_id} no existe`);
    if (dto.protocolo === "MQTT" && !dto.mqtt_topic?.trim()) throw new BadRequestException("El tópico MQTT es obligatorio cuando el protocolo es MQTT");
    this.validarRango(dto.valor_minimo_sensor, dto.valor_maximo_sensor);

    const guardado = await this.sensores.save(
      this.sensores.create({
        nombre_sensor: dto.nombre_sensor.trim(),
        codigo: dto.codigo?.trim() || null,
        tipo_sensor_id: dto.tipo_sensor_id,
        protocolo: dto.protocolo,
        endpoint_url: dto.endpoint_url?.trim() || null,
        mqtt_topic: dto.mqtt_topic?.trim() || null,
        valor_minimo_sensor: dto.valor_minimo_sensor,
        valor_maximo_sensor: dto.valor_maximo_sensor,
        activo: dto.activo,
        cultivoId: dto.cultivoId ?? null,
        lote_id: dto.lote_id ?? null,
        sub_lote_id: dto.sub_lote_id ?? null,
        global_config_id: dto.global_config_id ?? null,
        creadoPorUsuarioId: usuarioId,
      }),
    );
    if (!guardado.codigo) {
      const prefijo = tipo.nombre.normalize("NFD").replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase() || "SEN";
      await this.sensores.update(guardado.id, { codigo: `${prefijo}-${String(guardado.id).padStart(3, "0")}` });
    }
    return this.obtenerSensor(guardado.id);
  }

  async actualizarSensor(id: number, dto: ActualizarSensorDto) {
    const actual = await this.sensores.findOne({ where: { id } });
    if (!actual) throw new NotFoundException(`El sensor con ID ${id} no existe`);
    if (dto.tipo_sensor_id !== undefined && !(await this.tipos.findOne({ where: { id: dto.tipo_sensor_id } }))) {
      throw new NotFoundException(`El tipo de sensor con ID ${dto.tipo_sensor_id} no existe`);
    }
    const protocolo = dto.protocolo ?? actual.protocolo;
    const topic = dto.mqtt_topic !== undefined ? dto.mqtt_topic : actual.mqtt_topic;
    if (protocolo === "MQTT" && !topic?.trim()) throw new BadRequestException("El tópico MQTT es obligatorio cuando el protocolo es MQTT");
    this.validarRango(dto.valor_minimo_sensor ?? numero(actual.valor_minimo_sensor), dto.valor_maximo_sensor ?? numero(actual.valor_maximo_sensor));

    const cambios = Object.fromEntries(Object.entries(dto).filter(([, v]) => v !== undefined));
    // Un campo opcional que llega vacío se limpia
    for (const clave of ["endpoint_url", "mqtt_topic"] as const) {
      if (typeof cambios[clave] === "string") cambios[clave] = (cambios[clave] as string).trim() || null;
    }
    await this.sensores.update(id, cambios as Partial<SensorOrmEntity>);
    return this.obtenerSensor(id);
  }

  async eliminarSensor(id: number) {
    const fila = await this.sensores.findOne({ where: { id } });
    if (!fila) throw new NotFoundException(`El sensor con ID ${id} no existe`);
    await this.sensores.softDelete(id);
  }

  /* ───────── Lecturas y alertas ───────── */

  /**
   * Recibe una lectura (por HTTP desde la red local o escrita a mano): la guarda, actualiza el último valor
   * del sensor y, si sale del rango óptimo, genera una alerta (RF10.4 a RF10.6). Una alerta nueva se crea
   * solo cuando el sensor cambia de estado, para no repetirla con cada lectura.
   */
  async registrarLectura(dto: RegistrarLecturaDto) {
    const sensor = await this.sensores.findOne({ where: { id: dto.sensor_id }, relations: { tipoSensor: true } });
    if (!sensor) throw new NotFoundException(`El sensor con ID ${dto.sensor_id} no existe`);
    if (!sensor.activo) throw new BadRequestException("El sensor está inactivo: no recibe lecturas");

    const valor = Number(String(dto.valor).replace(",", "."));
    if (!Number.isFinite(valor)) throw new BadRequestException("El valor de la lectura debe ser un número");
    const fecha = dto.fecha_lectura ? new Date(dto.fecha_lectura) : new Date();

    const min = numero(sensor.valor_minimo_sensor);
    const max = numero(sensor.valor_maximo_sensor);
    const condicion = condicionDe(valor, min, max);
    const anterior = sensor.estado;

    const lectura = await this.lecturas.save(
      this.lecturas.create({
        sensor_id: sensor.id,
        valor: String(redondear(valor)),
        fecha_lectura: fecha,
        unidad: dto.unidad ?? sensor.tipoSensor?.unidad ?? "",
        observaciones: dto.observaciones?.trim() || null,
      }),
    );

    await this.sensores.update(sensor.id, {
      ultimo_valor: String(redondear(valor)),
      ultima_medicion: fecha,
      last_seen_at: new Date(),
      estado_conexion: "conectado",
      estado: condicion,
    });

    let alertaGenerada = false;
    if (condicion !== "Normal" && anterior !== condicion) {
      await this.alertas.save(
        this.alertas.create({
          sensor_id: sensor.id,
          valor,
          umbral: (condicion === "Exceso" ? max : min) ?? 0,
          tipo: condicion,
          fecha_alerta: fecha,
          lote_id: sensor.lote_id,
          sub_lote_id: sensor.sub_lote_id,
        }),
      );
      alertaGenerada = true;
    }
    return { id: lectura.id, valor, condicion, alertaGenerada };
  }

  async historial(sensorId: number, horas: number) {
    const desde = new Date(Date.now() - horas * 3_600_000);
    const sensor = await this.sensores.findOne({ where: { id: sensorId }, relations: { tipoSensor: true } });
    if (!sensor) throw new NotFoundException(`El sensor con ID ${sensorId} no existe`);
    const min = numero(sensor.valor_minimo_sensor);
    const max = numero(sensor.valor_maximo_sensor);
    const filas = await this.lecturas.find({ where: { sensor_id: sensorId, fecha_lectura: MoreThanOrEqual(desde) }, order: { fecha_lectura: "ASC" } });
    return filas.map((l) => {
      const valor = Number(l.valor);
      return { id: l.id, fecha: l.fecha_lectura, valor, unidad: l.unidad, observaciones: l.observaciones, condicion: condicionDe(valor, min, max) };
    });
  }

  async listarAlertas() {
    const filas = await this.alertas.find({
      relations: { sensor: { tipoSensor: true, cultivo: { encargado: true } }, lote: true, sublote: true },
      order: { fecha_alerta: "DESC", id: "DESC" },
    });
    // Una alerta está activa si es la última del sensor y el sensor sigue en ese estado
    const ultimaPorSensor = new Map<number, number>();
    for (const a of filas) if (!ultimaPorSensor.has(a.sensor_id)) ultimaPorSensor.set(a.sensor_id, a.id);

    return filas.map((a) => ({
      id: a.id,
      fecha: a.fecha_alerta,
      sensorId: a.sensor_id,
      sensor: a.sensor?.nombre_sensor ?? "",
      cultivoId: a.sensor?.cultivoId ?? null,
      lote: a.lote?.nombre ?? null,
      sublote: a.sublote?.nombre ?? null,
      valor: a.valor,
      umbral: a.umbral,
      unidad: a.sensor?.tipoSensor?.unidad ?? "",
      tipo: a.tipo,
      notificadoA: a.sensor?.cultivo?.encargado ? `${a.sensor.cultivo.encargado.nombre} ${a.sensor.cultivo.encargado.apellido}`.trim() : null,
      activa: ultimaPorSensor.get(a.sensor_id) === a.id && a.sensor?.estado === a.tipo,
    }));
  }

  /* ───────── Conexión global ───────── */

  private vistaConfig(c: IotGlobalConfigPersistence) {
    return {
      id: c.id,
      name: c.name,
      broker: c.broker,
      port: c.port,
      protocol: c.protocol,
      topicPrefix: c.topic_prefix,
      defaultTopics: c.default_topics,
      customTopics: c.custom_topics,
      loteId: c.lote_id,
      subLoteId: c.sub_lote_id,
      username: c.username,
      // La contraseña no sale nunca: solo se informa si hay una guardada
      tienePassword: !!c.password,
      activo: c.activo,
      autoDiscover: c.auto_discover,
    };
  }

  async listarConfigs() {
    return (await this.configs.find({ order: { id: "ASC" } })).map((c) => this.vistaConfig(c));
  }

  async guardarConfig(dto: GuardarConfigDto, id?: number) {
    const datos: Partial<IotGlobalConfigPersistence> = {
      name: dto.name.trim(),
      broker: dto.broker.trim(),
      port: dto.port,
      protocol: dto.protocol,
      topic_prefix: dto.topic_prefix ?? "",
      default_topics: dto.default_topics ?? "",
      custom_topics: dto.custom_topics ?? "",
      lote_id: dto.lote_id ?? null,
      sub_lote_id: dto.sub_lote_id ?? null,
      username: dto.username?.trim() ?? "",
      activo: dto.activo,
      auto_discover: dto.auto_discover ?? false,
    };
    if (dto.password) datos.password = cifrar(dto.password);

    if (id === undefined) {
      const creada = await this.configs.save(this.configs.create({ password: "", ...datos }));
      return this.vistaConfig(creada);
    }
    const actual = await this.configs.findOne({ where: { id } });
    if (!actual) throw new NotFoundException(`La configuración con ID ${id} no existe`);
    await this.configs.update(id, datos);
    return this.vistaConfig((await this.configs.findOne({ where: { id } }))!);
  }

  /** Comprueba que el broker responde en su dirección y puerto (conexión TCP, hasta 3 s). */
  probarConexion(broker: string, port: number): Promise<{ ok: boolean; mensaje: string }> {
    return new Promise((resolve) => {
      const socket = net.createConnection({ host: broker, port, timeout: 3000 });
      const terminar = (ok: boolean, mensaje: string) => { socket.destroy(); resolve({ ok, mensaje }); };
      socket.once("connect", () => terminar(true, "El broker responde en esa dirección y puerto."));
      socket.once("timeout", () => terminar(false, "No hubo respuesta del broker en 3 segundos."));
      socket.once("error", (e) => terminar(false, `No se pudo conectar: ${e.message}`));
    });
  }
}
