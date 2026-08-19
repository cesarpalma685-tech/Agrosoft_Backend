export class ProgramaFormacion {
  constructor(
    public readonly id: number | null,
    public numeroFicha: string,
    public nombre: string,
    public tipo?: string,
    public descripcion?: string,
    public fechaInicio?: Date,
    public fechaFin?: Date,
    public estado: string = 'activo',
    public cantidadAprendices: number = 0,
    public readonly createdAt?: Date,
  ) {}

  finalizar(): void {
    this.estado = 'finalizado';
  }
}
