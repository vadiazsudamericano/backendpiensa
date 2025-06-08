import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
import { User } from './users/user.entity';
import { Photo } from './gallery/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      port: 5432,
      username: 'postgres',         // <- reemplaza esto
      password: 'XZDxwzPvlQrbwsqLaIvgTdpPxojYQZOn',      // <- y esto
      database: 'railway',   // <- y esto también
      entities: [__dirname + `/**/*.entity{.ts,.js}`],
      synchronize: true
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    GalleryModule,
  ],
})
export class AppModule {}
