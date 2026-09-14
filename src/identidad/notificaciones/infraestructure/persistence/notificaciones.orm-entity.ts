<<<<<<< HEAD
=======
import { UsuarioOrmEntity } from 'src/identidad/usuarios/infraestructure/persistence/usuario.orm-entity';
>>>>>>> dc6f57a (relacion entre usuario y notificación)
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
<<<<<<< HEAD
} from "typeorm";
=======
  ManyToOne,
  JoinColumn,
} from 'typeorm';
>>>>>>> dc6f57a (relacion entre usuario y notificación)

@Entity("notificaciones")
export class NotificacionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuarioId!: number;

  @Column()
  titulo!: string;

  @Column("text")
  mensaje!: string;

  @Column({ default: false })
  leida!: boolean;

  @Column({
    type: "varchar",
    nullable: true,
  })
  tipo!: string | null;

  @Column({
    type: "json",
    nullable: true,
  })
  metadata!: Record<string, any> | null;

  @CreateDateColumn()
  created_at!: Date;
<<<<<<< HEAD
=======

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'usuarioId' })
  usuario!: UsuarioOrmEntity;
>>>>>>> dc6f57a (relacion entre usuario y notificación)
}
