// RUTA: src/main.ts (BACKEND)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- AÑADE ESTA LÍNEA ---
  app.enableCors({
    origin: 'https://medicleanfrontend.vercel.app/', // ¡Usa tu URL real de Vercel!
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();