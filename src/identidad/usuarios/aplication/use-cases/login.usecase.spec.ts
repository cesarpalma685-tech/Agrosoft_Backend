import * as bcrypt from "bcryptjs";
import { UnauthorizedException } from "@nestjs/common";
import { LoginUseCase } from "./login.usecase";
import { Usuario } from "../../domain/entities/usuario.entity";
import { UsuarioRepository } from "../ports/usuario.repository";
import { IAuthServicePort } from "../ports/auth-service.port";

describe("LoginUseCase", () => {
  const usuarioRepository = {
    buscarPorCorreo: jest.fn(),
  } as unknown as UsuarioRepository;
  const authService = {
    generateToken: jest.fn().mockReturnValue("token-de-prueba"),
  } as unknown as IAuthServicePort;
  const loginUseCase = new LoginUseCase(usuarioRepository, authService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rechaza una contraseña incorrecta y no genera JWT", async () => {
    const passwordHash = await bcrypt.hash("Correcta123!", 10);
    usuarioRepository.buscarPorCorreo = jest
      .fn()
      .mockResolvedValue(
        new Usuario(
          1,
          "Ana",
          "Perez",
          "123",
          "ana@example.com",
          passwordHash,
          1,
          null,
          null,
          "activo",
          null,
          null,
          new Date(),
        ),
      );

    await expect(
      loginUseCase.execute("ana@example.com", "Incorrecta123!"),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(authService.generateToken).not.toHaveBeenCalled();
  });

  it("emite JWT cuando la contraseña es correcta", async () => {
    const passwordHash = await bcrypt.hash("Correcta123!", 10);
    usuarioRepository.buscarPorCorreo = jest
      .fn()
      .mockResolvedValue(
        new Usuario(
          1,
          "Ana",
          "Perez",
          "123",
          "ana@example.com",
          passwordHash,
          1,
          null,
          null,
          "activo",
          null,
          null,
          new Date(),
        ),
      );

    await expect(
      loginUseCase.execute("ana@example.com", "Correcta123!"),
    ).resolves.toEqual({ token: "token-de-prueba" });
    expect(authService.generateToken).toHaveBeenCalledWith({
      id: "1",
      email: "ana@example.com",
    });
  });
});
