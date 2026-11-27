import { Insumo } from "../../domain/entities/crear-insumo.dto";

const redondear = (valor: number) => Math.round((valor + Number.EPSILON) * 100) / 100;

// Stock en unidad de uso, precio de uso, costo y valor del inventario salen
// de los datos de la presentación (RF6.3 y RF6.7).
export function calcularDerivados(base: Partial<Insumo>): Partial<Insumo> {
  const factor = Number(base.factorConversionUso ?? 1) || 1;
  const stockPresentacion = Number(base.stockPresentacion ?? 0);
  const precioPresentacion = Number(base.precioUnitarioPresentacion ?? 0);

  const stockUso = redondear(stockPresentacion * factor);
  const precioUso = redondear(precioPresentacion / factor);

  return {
    stockUso,
    precioUnitarioUso: precioUso,
    costoUnitario: precioUso,
    valorInventario: redondear(stockUso * precioUso),
  };
}
