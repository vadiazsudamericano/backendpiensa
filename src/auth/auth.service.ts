// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Importa bcrypt
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async register(createUserDto: CreateUserDto) {
  const { email, password, role } = createUserDto;

  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.usersService.create({
    email,
    password: hashedPassword,
    role,
  });

  return user;
  }

  // Método para validar las credenciales
  async validateUser(email: string, password: string): Promise<User | null> {
  // 1. Busca al usuario por su email
  const user = await this.usersService.findOneByEmail(email);

  // 2. Si el usuario existe Y la contraseña coincide...
  if (user && bcrypt.compareSync(password, user.password)) {
    // La comparación es: (contraseña_sin_encriptar, contraseña_encriptada_de_la_bd)
    return user; // La devuelve sin la contraseña
  }
  
  // 3. Si no, devuelve null
  return null;
}

  // Método para generar el token JWT
  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
