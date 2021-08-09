import { Module } from '@nestjs/common';
import { TipoPlanController } from './tipo-plan.controller';
import { TipoPlanService } from './tipo-plan.service';
import { MongooseModule } from "@nestjs/mongoose";
import { TipoPlan, TipoPlanSchema } from "./schemas/tipo-plan.schema";

@Module({
  imports : [
    MongooseModule.forFeature([{name: TipoPlan.name , schema: TipoPlanSchema}])
  ],
  controllers: [TipoPlanController],
  providers: [TipoPlanService]
})
export class TipoPlanModule {}
