import { Module } from '@nestjs/common';
import { FuentesApropiacionController } from './fuentes-apropiacion.controller';
import { FuentesApropiacionService } from './fuentes-apropiacion.service';
import { MongooseModule } from "@nestjs/mongoose";
import { FuentesApropiacion, FuentesApropiacionSchema } from "./schemas/fuentes-apropiacion.schema";

@Module({
  imports : [
    MongooseModule.forFeature([{name: FuentesApropiacion.name , schema: FuentesApropiacionSchema}])
  ],
  controllers: [FuentesApropiacionController],
  providers: [FuentesApropiacionService],
  exports: [FuentesApropiacionService],
})
export class FuentesApropiacionModule {}