// RUTA: src/main.ts (BACKEND)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });

  // ESTA ES LA LÍNEA CLAVE
  // Le decimos: "Usa el puerto que Railway te dé en process.env.PORT,
  // y si no existe (porque estamos en local), usa el puerto 3000".
  await app.listen(process.env.PORT || 3000);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();