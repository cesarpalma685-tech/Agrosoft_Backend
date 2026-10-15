import { RolNombre } from "../enums/rol-nombre.enum";

export class Rol {
  constructor(
    public readonly id: number | null,
    public nombre: RolNombre,
    public descripcion: string,
    public es_sistema: boolean,
    public estado: string,
  ) {}
}
