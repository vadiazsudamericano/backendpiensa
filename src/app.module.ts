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
    ConfigModule.forRoot({ isGlobal: true }), // ← Esto debe ir antes que se use `process.env`
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Railway te da esta URL
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    GalleryModule,
  ],
})
export class AppModule {}

