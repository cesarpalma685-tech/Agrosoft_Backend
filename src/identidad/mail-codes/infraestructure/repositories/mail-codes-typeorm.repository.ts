import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EmailCode } from "../../domain/entities/mail-codes.entity";
import { EmailCodeRepository } from "../../aplication/ports/mail-codes.repository";
import { EmailCodeOrmEntity } from "../persistence/mail-codes.orm-entity";

@Injectable()
export class EmailCodeTypeOrmRepository extends EmailCodeRepository {
  constructor(
    @InjectRepository(EmailCodeOrmEntity)
    private readonly repo: Repository<EmailCodeOrmEntity>,
  ) {
    super();
  }

  async crear(emailCode: EmailCode): Promise<EmailCode> {
    const orm = this.repo.create(this.aOrm(emailCode));
    const guardado = await this.repo.save(orm);
    return this.aDominio(guardado);
  }

  async actualizar(emailCode: EmailCode): Promise<EmailCode> {
    const actualizado = await this.repo.save(this.aOrm(emailCode));
    return this.aDominio(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async buscarPorId(id: number): Promise<EmailCode | null> {
    const emailCode = await this.repo.findOne({ where: { id } });

    return emailCode ? this.aDominio(emailCode) : null;
  }

  private aDominio(orm: EmailCodeOrmEntity): EmailCode {
    return new EmailCode(
      orm.id,
      orm.usuarioId,
      orm.tipo,
      orm.code,
      orm.expiresAt,
      orm.usedAt ?? undefined,
      orm.created_at,
    );
  }

  private aOrm(emailCode: EmailCode): Partial<EmailCodeOrmEntity> {
    return {
      id: emailCode.id ?? undefined,
      usuarioId: emailCode.usuarioId,
      tipo: emailCode.tipo,
      code: emailCode.code,
      expiresAt: emailCode.expiresAt,
      usedAt: emailCode.usedAt ?? null,
    };
  }
}
