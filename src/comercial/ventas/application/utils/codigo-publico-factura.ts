import * as crypto from "crypto";

// El QR de la factura lleva un código público: id de la venta + firma. Sin la firma no se puede
// adivinar la factura de otra venta, y no hace falta guardar nada en la base de datos.
const firma = (ventaId: number) =>
  crypto
    .createHmac("sha256", process.env.JWT_SECRET || "secreto_super_seguro")
    .update(`factura-publica:${ventaId}`)
    .digest("hex")
    .slice(0, 20);

export const codigoPublicoFactura = (ventaId: number) => `${ventaId}-${firma(ventaId)}`;

/** Devuelve el id de la venta si el código es auténtico; null si fue alterado o no existe. */
export function ventaIdDeCodigo(codigo: string): number | null {
  const m = /^(\d{1,9})-([0-9a-f]{20})$/.exec(codigo);
  if (!m) return null;
  const id = Number(m[1]);
  const esperado = Buffer.from(firma(id));
  const recibido = Buffer.from(m[2]);
  return crypto.timingSafeEqual(esperado, recibido) ? id : null;
}
