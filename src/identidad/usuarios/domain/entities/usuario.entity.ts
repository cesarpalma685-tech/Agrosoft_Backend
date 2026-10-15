import { ProgramaFormacionNombre } from "../../../../formacion/programas-formacion/domain/enums/programa-formacion-nombre.enum";

export class Usuario {
  constructor(
    public readonly id: number | null,
    public nombre: string,
    public apellido: string,
    public identificacion: string,
    public correo: string,
    public passwordHash: string,
    public idFicha: number | null,
    public programaFormacion: ProgramaFormacionNombre | null,
    public telefono: string | null,
    public estado: string,

    public emailVerifiedAt: Date | null,
    public lastLoginAt: Date | null,

    public readonly createdAt: Date,

    public rolId: number | null = null,

    // Imagen en base64 (data URL)
    public fotoPerfil: string | null = null,

    public passwordActualizadoAt: Date | null = null,
  ) {}
}
