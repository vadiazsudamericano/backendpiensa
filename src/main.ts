import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  await app.listen(3000, '0.0.0.0');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

}
bootstrap();
