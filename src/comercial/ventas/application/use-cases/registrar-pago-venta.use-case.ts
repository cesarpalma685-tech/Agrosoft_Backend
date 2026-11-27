import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { VentaRepositoryPort } from "../ports/venta.repository.ports";
import { RegistrarPagoDto } from "../dto/crear-venta.dto";
import { PagoRepositoryPort } from "../../../pagos/application/ports/pago.repository.port";
import { Pago } from "../../../pagos/domain/entities/pago.entity";
import { ConsultarVentasUseCase } from "./consultar-ventas.use-case";

const redondear = (valor: number) => Math.round((valor + Number.EPSILON) * 100) / 100;

@Injectable()
export class RegistrarPagoVentaUseCase {
  constructor(
    private readonly ventaRepository: VentaRepositoryPort,
    private readonly pagoRepository: PagoRepositoryPort,
    private readonly consultar: ConsultarVentasUseCase,
  ) {}

  async execute(ventaId: number, dto: RegistrarPagoDto) {
    const venta = await this.ventaRepository.findById(ventaId);
    if (!venta) throw new NotFoundException(`La venta con ID ${ventaId} no existe`);
    if (venta.estado === "anulada") throw new BadRequestException("La venta está anulada: no admite pagos");

    const previos = await this.pagoRepository.findByVentaId(ventaId);
    const pagado = previos.reduce((s, p) => s + p.monto, 0);
    const saldo = redondear(venta.total - pagado);
    if (dto.monto > saldo + 0.001) {
      throw new BadRequestException(`El pago supera el saldo pendiente (${saldo})`);
    }

    const pago = new Pago();
    Object.assign(pago, { ventaId, metodo: dto.metodo, monto: dto.monto, moneda: "COP", referencia: dto.referencia });
    await this.pagoRepository.save(pago);

    const nuevoPagado = redondear(pagado + dto.monto);
    await this.ventaRepository.update(ventaId, { estado: nuevoPagado >= venta.total - 0.001 ? "pagada" : "pago_parcial" });
    return await this.consultar.obtener(ventaId);
  }
}
