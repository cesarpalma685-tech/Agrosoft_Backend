import * as bcrypt from "bcryptjs";
import { UnauthorizedException } from "@nestjs/common";
import { LoginUseCase } from "./login.usecase";
import { Usuario } from "../../domain/entities/usuario.entity";
import { UsuarioRepository } from "../ports/usuario.repository";
import { IAuthServicePort } from "../ports/auth-service.port";
import { RolRepository } from "../../../roles/aplication/ports/rol.repository";

describe("LoginUseCase", () => {
  const usuarioRepository = {
    buscarPorCorreo: jest.fn(),
  } as unknown as UsuarioRepository;
  const authService = {
    generateToken: jest.fn().mockReturnValue("token-de-prueba"),
  } as unknown as IAuthServicePort;
  const rolRepository = {
    buscarPorId: jest.fn().mockResolvedValue(null),
  } as unknown as RolRepository;
  const loginUseCase = new LoginUseCase(
    usuarioRepository,
    authService,
    rolRepository,
  );

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
    ).resolves.toEqual({
      token: "token-de-prueba",
      usuario: {
        id: 1,
        nombre: "Ana",
        apellido: "Perez",
        correo: "ana@example.com",
        telefono: null,
        identificacion: "123",
        estado: "activo",
        rol: null,
        rolLabel: null,
        fotoPerfil: null,
        passwordActualizadoAt: null,
      },
    });
    expect(authService.generateToken).toHaveBeenCalledWith({
      id: "1",
      email: "ana@example.com",
    });
  });
});
