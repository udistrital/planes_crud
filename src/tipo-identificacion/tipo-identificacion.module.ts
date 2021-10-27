import { Module } from '@nestjs/common';
import { TipoIdentificacionController } from './tipo-identificacion.controller';
import { TipoIdentificacionService } from './tipo-identificacion.service';
import { MongooseModule } from "@nestjs/mongoose";
import { TipoIdentificacion, TipoIdentificacionSchema } from "./schemas/tipo-identificacion.schema";

@Module({
  imports : [
    MongooseModule.forFeature([{name: TipoIdentificacion.name , schema: TipoIdentificacionSchema}])
  ],
  controllers: [TipoIdentificacionController],
  providers: [TipoIdentificacionService],
  exports: [TipoIdentificacionService]
})
export class TipoIdentificacionModule {}
