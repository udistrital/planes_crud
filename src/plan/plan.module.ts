import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Plan, PlanSchema } from "./schemas/plan.schema";

@Module({
  imports : [
    MongooseModule.forFeature([{name: Plan.name , schema: PlanSchema}])
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService]
})
export class PlanModule {}
