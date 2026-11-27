import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UsuarioOrmEntity } from "../persistence/usuario.orm-entity";
import { RolNombre } from "../../../roles/domain/enums/rol-nombre.enum";

/** Usar después de JwtAuthGuard: deja pasar solo a un administrador activo. */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{ user?: { userId?: number | string } }>();
    const id = Number(req.user?.userId);
    const usuario = Number.isFinite(id)
      ? await this.dataSource.getRepository(UsuarioOrmEntity).findOne({ where: { id }, relations: { rol: true } })
      : null;
    if (!usuario || usuario.estado !== "activo" || usuario.rol?.nombre !== RolNombre.ADMINISTRADOR) {
      throw new ForbiddenException("Solo el administrador puede realizar esta acción");
    }
    return true;
  }
}
