import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { EstadoPlanController } from './estado-plan.controller';
import { EstadoPlanService } from './estado-plan.service';
import { EstadoPlan, EstadoPlanSchema } from "./schemas/estado-plan.schema";

@Module({
  imports : [
    MongooseModule.forFeature([{name: EstadoPlan.name , schema: EstadoPlanSchema}])
  ],
  controllers: [EstadoPlanController],
  providers: [EstadoPlanService]
})
export class EstadoPlanModule {}
