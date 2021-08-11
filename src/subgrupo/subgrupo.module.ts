import { ImATeapotException, Module } from '@nestjs/common';
import { SubgrupoController } from './subgrupo.controller';
import { SubgrupoService } from './subgrupo.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Subgrupo, SubgrupoSchema } from "./schemas/subgrupo.schema";
import { SubgrupoDto } from './dto/subgrupo.dto';

@Module({
  imports : [
    MongooseModule.forFeature([{name: Subgrupo.name , schema: SubgrupoSchema}])
  ],
  controllers: [SubgrupoController],
  providers: [SubgrupoService],
  exports: [ SubgrupoService]
})
export class SubgrupoModule {}
