import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstadoSeguimientoController } from './estado-seguimiento.controller';
import { EstadoSeguimientoService } from './estado-seguimiento.service';
import { EstadoSeguimiento, EstadoSeguimientoSchema } from './schemas/estado-seguimiento.schema';


@Module({
  imports : [
    MongooseModule.forFeature([{name: EstadoSeguimiento.name , schema: EstadoSeguimientoSchema}])
  ],
  controllers: [EstadoSeguimientoController],
  providers: [EstadoSeguimientoService]
})
export class EstadoSeguimientoModule {}
