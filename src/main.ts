import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('plan_crud')
    .setDescription('API CRUD para el registro de planes para el cliente de planeacion')
    .setVersion('1.0')
    .addTag('plan')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger.json", JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  await app.listen( 3000);
}
bootstrap();
