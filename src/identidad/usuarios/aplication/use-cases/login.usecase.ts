import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { USUARIO_REPOSITORY, UsuarioRepository } from '../ports/usuario.repository';
import { AUTH_SERVICE_PORT, IAuthServicePort } from '../ports/auth-service.port';

@Injectable()
export class LoginUseCase {
    constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    @Inject(AUTH_SERVICE_PORT)
    private readonly authService: IAuthServicePort,
    ) {}

    async execute(correo: string, pass: string) {
    // 1. Buscamos por la propiedad correcta: buscarPorCorreo
    const usuario = await this.usuarioRepository.buscarPorCorreo(correo);
    
    if (!usuario) {
        throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare(pass, usuario.passwordHash);
    if (!passwordValida) {
        throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Pasamos correo y convertimos id a string
    const token = this.authService.generateToken({
        id: String(usuario.id),
        email: usuario.correo,
    });

    return { token };
        }
}