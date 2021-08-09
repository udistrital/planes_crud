import { Module } from '@nestjs/common';
import { SubgrupoDetalleController } from './subgrupo-detalle.controller';
import { SubgrupoDetalleService } from './subgrupo-detalle.service';
import { MongooseModule } from "@nestjs/mongoose";
import { SubgrupoDetalle, SubgrupoDetalleSchema } from "./schemas/subgrupo-detalle.schema";

@Module({
  imports : [
    MongooseModule.forFeature([{name: SubgrupoDetalle.name , schema: SubgrupoDetalleSchema}])
  ],
  controllers: [SubgrupoDetalleController],
  providers: [SubgrupoDetalleService]
})
export class SubgrupoDetalleModule {}
