import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('api');
  app.enableCors();
  const PORT = Number(3000)|| 8080;
  await app.listen(PORT);
}
bootstrap();
