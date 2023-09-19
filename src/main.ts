import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { environment } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('plan_crud')
    .setDescription('API CRUD para el registro de planes para el cliente de planeacion')
    .setVersion('1.0')
    .addTag('plan')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger.json", JSON.stringify(document, null, 4));
  SwaggerModule.setup('api', app, document);

  await app.listen( parseInt(environment.HTTP_PORT,10)|| 8080);

}
bootstrap();
