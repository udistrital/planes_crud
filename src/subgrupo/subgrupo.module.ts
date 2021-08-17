import {  Module } from '@nestjs/common';
import { SubgrupoController } from './subgrupo.controller';
import { SubgrupoService } from './subgrupo.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Subgrupo, SubgrupoSchema } from "./schemas/subgrupo.schema";
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports : [
    MongooseModule.forFeature([{name: Subgrupo.name , schema: SubgrupoSchema}]),
    PlanModule
  ],
  controllers: [SubgrupoController],
  providers: [SubgrupoService],
  exports: [SubgrupoService]
})
export class SubgrupoModule {}
