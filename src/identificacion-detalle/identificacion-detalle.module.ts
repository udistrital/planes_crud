import { Module } from '@nestjs/common';
import { IdentificacionDetalleController } from './identificacion-detalle.controller';
import { IdentificacionDetalleService } from './identificacion-detalle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentificacionDetalle, IdentificacionDetalleSchema } from './schema/identificacion-detalle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: IdentificacionDetalle.name, schema: IdentificacionDetalleSchema}
    ])
  ],
  controllers: [IdentificacionDetalleController],
  providers: [IdentificacionDetalleService],
  exports: [IdentificacionDetalleService]
})
export class IdentificacionDetalleModule {}
