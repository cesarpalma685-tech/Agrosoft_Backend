import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { CrearUsuarioUseCase } from "../../aplication/use-cases/crear-usuario.usecase";
import { RolesSeeder } from "../../../roles/infraestructure/seeders/roles.seeder";
import { RolNombre } from "../../../roles/domain/enums/rol-nombre.enum";

/**
 * Crea el usuario Administrador inicial si están definidas ADMIN_CORREO y
 * ADMIN_PASSWORD en el .env. Si el correo ya existe, no hace nada.
 */
@Injectable()
export class AdminSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminSeeder.name);

  constructor(
    private readonly rolesSeeder: RolesSeeder,
    private readonly crearUsuario: CrearUsuarioUseCase,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const correo = process.env.ADMIN_CORREO;
    const password = process.env.ADMIN_PASSWORD;
    if (!correo || !password) {
      this.logger.warn(
        "ADMIN_CORREO / ADMIN_PASSWORD no definidos: no se crea el administrador",
      );
      return;
    }

    // Garantiza que el rol exista sin depender del orden de arranque
    await this.rolesSeeder.sembrar();

    try {
      await this.crearUsuario.ejecutar(
        {
          nombre: process.env.ADMIN_NOMBRE ?? "Administrador",
          apellido: process.env.ADMIN_APELLIDO ?? "Agrosoft",
          identificacion: process.env.ADMIN_IDENTIFICACION ?? "0000000000",
          correo,
          password,
          rol: RolNombre.ADMINISTRADOR,
        },
        { permitirAdministrador: true },
      );
      this.logger.log(`Administrador ${correo} creado`);
    } catch (error) {
      if ((error as { status?: number }).status === 409) return; // ya existe
      throw error;
    }
  }
}
