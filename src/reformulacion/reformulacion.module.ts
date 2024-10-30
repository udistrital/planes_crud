import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReformulacionController } from './reformulacion.controller';
import { ReformulacionService } from './reformulacion.service';
import {
  Reformulacion,
  ReformulacionSchema,
} from './schemas/reformulacion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reformulacion.name, schema: ReformulacionSchema },
    ]),
  ],
  controllers: [ReformulacionController],
  providers: [ReformulacionService],
  exports: [ReformulacionService],
})
export class ReformulacionModule {}
