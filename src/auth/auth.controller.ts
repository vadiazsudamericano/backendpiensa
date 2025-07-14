import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.login(user); // ✅ Solo si user no es null
  }
}
