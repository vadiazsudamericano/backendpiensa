import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HerramientaModule } from './herramienta/herramienta.module';
import { RegistroModule } from './registro-herramienta/registro-herramienta.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RegistroModule,
    HerramientaModule,
    ConfigModule.forRoot({ isGlobal: true }), // Carga global de variables de entorno
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'interchange.proxy.rlwy.net',
  port: 14337,
  username: 'postgres',
  password: 'XZDxwzPvlQrbwsqLaIvgTdpPxojYQZOn',
  database: 'railway',
  synchronize: true, // para evitar cambios automáticos en las tablas
  autoLoadEntities: true,
}),
    UsersModule,
    AuthModule,
    GalleryModule,
    RegistroModule,
    HerramientaModule
  ],
})
export class AppModule {
  constructor() {
    console.log('✅ DATABASE_URL:', process.env.DATABASE_URL); // debe mostrar la URL completa
  }
}
