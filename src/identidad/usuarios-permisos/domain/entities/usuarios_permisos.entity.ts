export class UsuarioPermiso {
constructor(
    public readonly id: number | null,
    public usuarioId: number,
    public permisoId: number,
) {}
}
