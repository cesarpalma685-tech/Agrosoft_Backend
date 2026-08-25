import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secreto_super_seguro',
    });
  }

  async validate(payload: { id: number | string; email: string }) {
    if (!payload.id) {
      throw new UnauthorizedException('Token no válido');
    }
    // Lo que retornes aquí se adjunta automáticamente a req.user
    return { userId: payload.id, email: payload.email };
  }
}