// RUTA: [Tu Proyecto de Backend]/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- ESTE ES EL BLOQUE IMPORTANTE ---
  // Habilitamos CORS para permitir peticiones desde otros dominios.
  app.enableCors({
    // Para la demo, puedes usar 'true' que permite cualquier origen.
    // Para máxima seguridad en producción, deberías usar la URL de tu Vercel.
    origin: 'https://medicleanfrontend.vercel.app', // Alternativa más segura
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Escucha en el puerto que le asigne Railway, o en el 3000 si es local.
  await app.listen(process.env.PORT || 3000);
}
bootstrap();