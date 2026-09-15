import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IAuthServicePort } from "../../aplication/ports/auth-service.port";

@Injectable()
export class JwtAuthService implements IAuthServicePort {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: { id:number| string; email: string }): string {
    return this.jwtService.sign(payload);
  }
}
