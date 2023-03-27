import { Module } from '@nestjs/common';
import { PeriodoSeguimientoService } from './periodo-seguimiento.service';
import { PeriodoSeguimientoController } from './periodo-seguimiento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodoSeguimiento, PeriodoSeguimientoSchema } from "./schemas/periodo-seguimiento.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: PeriodoSeguimiento.name, schema: PeriodoSeguimientoSchema }])],
  controllers: [PeriodoSeguimientoController],
  providers: [PeriodoSeguimientoService],
  exports: [PeriodoSeguimientoService]
})
export class PeriodoSeguimientoModule { }
