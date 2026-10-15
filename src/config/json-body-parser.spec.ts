import { Body, Controller, Put } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { configureJsonBodyParser } from './json-body-parser';

@Controller('plan')
class PlanBodyController {
  @Put(':id')
  put(@Body() body: Record<string, unknown>) {
    return body;
  }
}

describe('configureJsonBodyParser', () => {
  it('procesa el cuerpo JSON de un PUT a /plan', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlanBodyController],
    }).compile();
    const app = moduleRef.createNestApplication<NestExpressApplication>();
    configureJsonBodyParser(app);
    await app.init();

    const payload = {
      _id: 'plan-id',
      nombre: 'Plan de Acción 2027',
      estado_plan_id: 'estado-revision',
    };

    await request(app.getHttpServer())
      .put('/plan/plan-id')
      .send(payload)
      .expect(200)
      .expect(payload);

    await app.close();
  });
});
