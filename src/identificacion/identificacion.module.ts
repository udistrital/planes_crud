import { Module } from '@nestjs/common';
import { IdentificacionController } from './identificacion.controller';
import { IdentificacionService } from './identificacion.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Identificacion, IdentificacionSchema } from "./schemas/identificacion.schema";

@Module({
  imports : [
    MongooseModule.forFeature([{name: Identificacion.name , schema: IdentificacionSchema}])
  ],
  controllers: [IdentificacionController],
  providers: [IdentificacionService],
  exports: [IdentificacionService],
})
export class IdentificacionModule {}
