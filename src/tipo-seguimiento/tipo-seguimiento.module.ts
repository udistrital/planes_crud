import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoSeguimiento, TipoSeguimientoSchema } from './schemas/tipo-seguimiento.schema';
import { TipoSeguimientoController } from './tipo-seguimiento.controller';
import { TipoSeguimientoService } from './tipo-seguimiento.service';

@Module({
  imports : [
    MongooseModule.forFeature([{name: TipoSeguimiento.name , schema: TipoSeguimientoSchema}])
  ],
  controllers: [TipoSeguimientoController],
  providers: [TipoSeguimientoService]
})
export class TipoSeguimientoModule {}
