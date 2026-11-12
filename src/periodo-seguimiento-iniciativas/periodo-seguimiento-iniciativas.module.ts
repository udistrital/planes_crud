import { Module } from '@nestjs/common';
import { PeriodoSeguimientoIniciativasService } from './periodo-seguimiento-iniciativas.service';
import { PeriodoSeguimientoIniciativasController } from './periodo-seguimiento-iniciativas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodoSeguimientoIniciativas, PeriodoSeguimientoSchema } from "./schemas/periodo-seguimiento-iniciativas.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: PeriodoSeguimientoIniciativas.name, schema: PeriodoSeguimientoSchema }])],
  controllers: [PeriodoSeguimientoIniciativasController],
  providers: [PeriodoSeguimientoIniciativasService],
  exports: [PeriodoSeguimientoIniciativasService]
})
export class PeriodoSeguimientoIniciativasModule { }
