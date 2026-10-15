import * as bcrypt from "bcryptjs";
import { BadRequestException } from "@nestjs/common";
import { CambiarPasswordUseCase } from "./cambiar-password.usecase";
import { Usuario } from "../../domain/entities/usuario.entity";
import { UsuarioRepository } from "../ports/usuario.repository";

describe("CambiarPasswordUseCase", () => {
  const crearUsuario = async (password: string) =>
    new Usuario(
      1,
      "Ana",
      "Perez",
      "123",
      "ana@example.com",
      await bcrypt.hash(password, 10),
      1,
      null,
      null,
      "activo",
      null,
      null,
      new Date(),
    );

  const armar = (usuario: Usuario) => {
    const repository = {
      buscarPorId: jest.fn().mockResolvedValue(usuario),
      actualizar: jest.fn().mockImplementation((u: Usuario) => Promise.resolve(u)),
    } as unknown as UsuarioRepository;
    return { repository, useCase: new CambiarPasswordUseCase(repository) };
  };

  it("guarda el hash de la nueva contraseña y la fecha del cambio", async () => {
    const usuario = await crearUsuario("Actual123!");
    const { repository, useCase } = armar(usuario);

    const resultado = await useCase.ejecutar(1, "Actual123!", "Nueva12345!");

    expect(repository.actualizar).toHaveBeenCalledTimes(1);
    expect(await bcrypt.compare("Nueva12345!", usuario.passwordHash)).toBe(true);
    expect(usuario.passwordActualizadoAt).toBeInstanceOf(Date);
    expect(resultado.passwordActualizadoAt).toBe(usuario.passwordActualizadoAt);
  });

  it("rechaza si la contraseña actual es incorrecta", async () => {
    const { repository, useCase } = armar(await crearUsuario("Actual123!"));

    await expect(
      useCase.ejecutar(1, "Equivocada1!", "Nueva12345!"),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(repository.actualizar).not.toHaveBeenCalled();
  });

  it("rechaza si la nueva contraseña es igual a la actual", async () => {
    const { repository, useCase } = armar(await crearUsuario("Actual123!"));

    await expect(
      useCase.ejecutar(1, "Actual123!", "Actual123!"),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(repository.actualizar).not.toHaveBeenCalled();
  });
});
