export class Factura {
    id!: number;
    ventaId!: number;
    numero!: string;
    prefijo?: string;
    fechaEmision!: Date;
    vencimiento!: Date;
    qrUrl?: string;
    pdfUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}