import { NestExpressApplication } from '@nestjs/platform-express';

export function configureJsonBodyParser(app: NestExpressApplication): void {
  // Algunas identificaciones superan el límite predeterminado. El parser debe
  // ser global para no impedir que Nest procese el cuerpo JSON de otras rutas.
  app.useBodyParser('json', { limit: '1mb' });
}
