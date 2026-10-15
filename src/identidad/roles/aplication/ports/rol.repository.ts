import { Rol } from "../../domain/entities/rol.entity";
import { RolNombre } from "../../domain/enums/rol-nombre.enum";

export const ROL_REPOSITORY = "ROL_REPOSITORY";

export abstract class RolRepository {
  abstract crear(rol: Rol): Promise<Rol>;
  abstract eliminar(id: number): Promise<void>;
  abstract actualizar(rol: Rol): Promise<Rol>;
  abstract buscarPorId(id: number): Promise<Rol | null>;
  abstract buscarPorNombre(nombre: RolNombre): Promise<Rol | null>;
}
