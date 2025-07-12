// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Importa bcrypt

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async register(createUserDto: CreateUserDto) {
  const { username, password, role, email } = createUserDto;

  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.usersService.create({
    username,
    password: hashedPassword,
    role,
    email,  // Pasamos el email también
  });

  return user;
  }

  // Método para validar las credenciales
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {  // Compara las contraseñas correctamente
      return user;
    }
    return null;
  }

  // Método para generar el token JWT
  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
