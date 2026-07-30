export class Usuario {
  constructor(
    public readonly id: number | null,
    public nombre: string,
    public apellido: string,
    public identificacion: string,
    public correo: string,
    public passwordHash: string,
    public idFicha:number,
    public programaFormacionId:string | null,
    public telefono:string | null,
    public estado: string,

    public emailVerifiedAt: Date | null,
    public lastLoginAt: Date | null,

    public readonly createdAt: Date,
  ) {}

}