import { ProveedoresDto } from "../dto/crear-proveedores.dto";

export abstract class ProveedoresRepositoryPort {
  abstract crear(proveedor: ProveedoresDto): Promise<ProveedoresDto>;

  abstract listar(): Promise<ProveedoresDto[]>;

  abstract obtenerPorId(id: number): Promise<ProveedoresDto | null>;

  abstract actualizar(
    id: number,
    datos: Partial<ProveedoresDto>,
  ): Promise<ProveedoresDto | null>;

  abstract eliminar(id: number): Promise<boolean>;
}
