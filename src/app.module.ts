// RUTA: src/app.module.ts (BACKEND)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Asegúrate de tener esto para que process.env funcione bien
    TypeOrmModule.forRoot({
      type: 'postgres',
      
      // ESTA ES LA CONFIGURACIÓN CLAVE PARA RAILWAY
      // Le decimos que tome toda la configuración de la variable de entorno DATABASE_URL
      url: process.env.DATABASE_URL,
      
      // Es importante en producción añadir la configuración SSL
      ssl: {
        rejectUnauthorized: false,
      },

      autoLoadEntities: true,
      synchronize: true, // ¡CUIDADO! synchronize: true es bueno para desarrollo pero riesgoso en producción
    }),
    // ... tus otros módulos (UsersModule, AuthModule, etc.)
  ],
  // ...
})
export class AppModule {}