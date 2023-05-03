import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeguimientoDetalle, SeguimientoDetalleSchema } from './schemas/seguimiento-detalle.schema';
import { SeguimientoDetalleController } from './seguimiento-detalle.controller';
import { SeguimientoDetalleService } from './seguimiento-detalle.service';

@Module({
  imports : [
    MongooseModule.forFeature([{name: SeguimientoDetalle.name , schema: SeguimientoDetalleSchema}])
  ],
  controllers: [SeguimientoDetalleController],
  providers: [SeguimientoDetalleService]
})
export class SeguimientoDetalleModule {}
