import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RolOrmEntity } from '../../../roles/infraestructure/persistence/rol.orm-entity';
import { ProgramaFormacionOrmEntity } from '../../../programas-formacion/infraestructure/persistence/programa-formacion.orm-entity';

@Entity('usuarios')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  nombre!: string;

  @Column({ type: 'varchar' })
  apellido!: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  identificacion!: string;

  @Column({ type: 'int', nullable: true })
  idFicha!: number;

  @Column({ type: 'varchar', nullable: true })
  programaFormacionId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  telefono!: string | null;

  @Column({ type: 'varchar', unique: true })
  correo!: string;

  @Column({ type: 'varchar' })
  passwordHash!: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt!: Date | null;

  @Column({ type: 'varchar', default: 'activo' })
  estado!: string;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => RolOrmEntity)
  @JoinColumn({ name: 'rolId' })
  rol!: RolOrmEntity;

  @ManyToOne(() => ProgramaFormacionOrmEntity )
  @JoinColumn({ name: 'programaFormacionId' })
  programaFormacion!: ProgramaFormacionOrmEntity;

  
}
