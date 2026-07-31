import { Injectable, NotFoundException } from "@nestjs/common";
import { AlmacenRepositoryPort } from "../../aplication/ports/almacen.repository.port";
import { InjectRepository } from "@nestjs/typeorm";
import { AlmacenOrmEntity } from "../persistence/almacen.orm-entity";
import { Repository } from "typeorm";
import { Almacen } from "../../domain/entities/crear-almacen.dto";

@Injectable()
export class AlmacenTypeOrmRepository extends AlmacenRepositoryPort{
    constructor(
        @InjectRepository(AlmacenOrmEntity)
        private readonly repository: Repository<AlmacenOrmEntity>,
    ){super();}
    async save(almacen: Almacen): Promise<Almacen> {
  const entity = this.repository.create({
    nombre: almacen.nombre,
    descripcion: almacen.descripcion,
    ubicacion: almacen.ubicacion,
  });

  const saved = await this.repository.save(entity);
  return saved as unknown as Almacen;
}
    async findById(id:number):Promise<Almacen| null>{
        const entity= await this.repository.findOne({where:{id}});
        return entity ? (entity as unknown as Almacen): null;
    }
    async findAll(): Promise<Almacen[]>{
            const entities = await this.repository.find();
            return entities as unknown as Almacen[];
        }
        async update(id: number, almacen: Partial<Almacen>): Promise<Almacen>{
            await this.repository.update(id, almacen as Partial<AlmacenOrmEntity>);
            const updated = await this.findById(id);
            if (!updated){
                throw new NotFoundException(`Almacen con ID ${id} no encontrado`) 
            }
            return updated;
        }
        async softDelete(id: number ): Promise<void>{
            await this.repository.softDelete(id);
        }
}