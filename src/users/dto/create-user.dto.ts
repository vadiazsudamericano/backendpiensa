// src/users/dto/create-user.dto.ts
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsEmail()  // Validación de email
  @IsNotEmpty()
  email: string;  // Añadir la propiedad email
}
