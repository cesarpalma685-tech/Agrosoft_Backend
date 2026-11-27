import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

// La clave sale de IOT_SECRET (o, si no existe, de JWT_SECRET) y no se guarda en la base.
const clave = () => scryptSync(process.env.IOT_SECRET || process.env.JWT_SECRET || "secreto_super_seguro", "agrosoft-iot", 32);

export function cifrar(texto: string): string {
  if (!texto) return "";
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", clave(), iv);
  const cifrado = Buffer.concat([cipher.update(texto, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), cifrado].map((b) => b.toString("base64")).join(".");
}

export function descifrar(valor: string): string {
  if (!valor) return "";
  const [iv, tag, cifrado] = valor.split(".").map((p) => Buffer.from(p, "base64"));
  const decipher = createDecipheriv("aes-256-gcm", clave(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(cifrado), decipher.final()]).toString("utf8");
}
