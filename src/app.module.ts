import { Module } from '@nestjs/common';
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
      host: 'localhost',
      port: 5432,
      username: 'postgres',         // <- reemplaza esto
      password: '090306',      // <- y esto
      database: 'loginp_db',   // <- y esto también
      entities: [User, Photo],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    GalleryModule,
  ],
})
export class AppModule {}
