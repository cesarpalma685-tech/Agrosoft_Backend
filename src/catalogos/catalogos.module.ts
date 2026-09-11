import { Module } from "@nestjs/common";
import { CategoriasModule } from "./categorias/categorias.module";
import { ProductosAgroModule } from "./productos_agro/productos_agro.module";
import { ProveedoresModule } from "./proveedores/proveedores.module";

@Module({
  imports: [CategoriasModule, ProductosAgroModule, ProveedoresModule],
})
export class CatalogosModule {}
