import { Injectable, NotFoundException } from "@nestjs/common";
import { InsumoOrmEntity } from "../persistence/insumo.orm-entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InsumoRepositoryPort } from "../../application/ports/insumo.repository.port";
import { Insumo } from "../../domain/entities/crear-insumo.dto";

@Injectable()
export class InsumoTypeOrmRepository extends InsumoRepositoryPort{
    constructor(
        @InjectRepository(InsumoOrmEntity)
        private readonly repository: Repository<InsumoOrmEntity>,
    ){super();}
    async save(insumo:Insumo): Promise<Insumo>{
        const entity = this.repository.create(insumo as Partial<InsumoOrmEntity>);
        const saved = await this.repository.save(entity);
        return saved as unknown as Insumo;
    }
    async findById(id:number): Promise<Insumo| null>{
        const entity= await this.repository.findOne({where:{id}});
        return entity ? (entity as unknown as Insumo): null;
    }
    async findAll(): Promise<Insumo[]>{
        const entities = await this.repository.find();
        return entities as unknown as Insumo[];
    }
    async update(id: number, insumo: Partial<Insumo>): Promise<Insumo>{
        await this.repository.update(id, insumo as Partial<InsumoOrmEntity>);
        const updated = await this.findById(id);
        if (!updated){
            throw new NotFoundException(`Insumo con ID ${id} no encontrado`) 
        }
        return updated;
    }
    async softDelete(id: number ): Promise<void>{
        await this.repository.softDelete(id);
    }
    async findByAlmacen(almacenId: number): Promise <Insumo[]>{
        const entities = await this.repository.find({where:{almacenId}});
        return entities as unknown as Insumo[];
    }
}
