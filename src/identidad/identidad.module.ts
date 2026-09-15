import { Module } from "@nestjs/common";
import { ClienteModule } from "./clientes/clientes.module";
import { EmailCodeModule } from "./mail-codes/mail-codes.module";
import { NotificacionModule } from "./notificaciones/notificaciones.module";
import { PermisoModule } from "./permisos/permisos.module";
import { RolPermisoModule } from "./rol-permisos/rol-permisos.module";
import { RolModule } from "./roles/roles.module";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { UsuarioPermisoModule } from "./usuarios-permisos/usuarios-permisos.module";

@Module({
  imports: [
    ClienteModule,
    EmailCodeModule,
    NotificacionModule,
    PermisoModule,
    RolPermisoModule,
    RolModule,
    UsuariosModule,
    UsuarioPermisoModule,
  ],
})
export class IdentidadModule {}
