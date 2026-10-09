import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import * as fs from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { environment } from './config/configuration';
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

async function loadSsmParameters() {
  const parameterStore = process.env.PARAMETER_STORE;
  if (!parameterStore) return;

  const client = new SSMClient({});
  const [userResponse, passwordResponse] = await Promise.all([
    client.send(new GetParameterCommand({
      Name: `/${parameterStore}/planes_mongo_crud/db/username`,
    })),
    client.send(new GetParameterCommand({
      Name: `/${parameterStore}/planes_mongo_crud/db/password`,
      WithDecryption: true,
    })),
  ]);

  process.env.PLANES_CRUD_USER = userResponse.Parameter?.Value;
  process.env.PLANES_CRUD_PASS = passwordResponse.Parameter?.Value;
}

async function bootstrap() {
  await loadSsmParameters();
  const app = await NestFactory.create(AppModule);

  // El campo `dato` contiene JSON serializado y puede superar los 100 KiB
  // permitidos por defecto. El límite ampliado se restringe a este recurso.
  app.use('/identificacion-detalle', json({ limit: '1mb' }));

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
