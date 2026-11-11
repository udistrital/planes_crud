import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubmoduloIniciativaController } from './submodulo-iniciativa.controller';
import { SubmoduloIniciativaService } from './submodulo-iniciativa.service';
import {
  SubmoduloIniciativa,
  SubmoduloIniciativaSchema,
} from './schemas/submodulo-iniciativa.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubmoduloIniciativa.name, schema: SubmoduloIniciativaSchema },
    ]),
  ],
  controllers: [SubmoduloIniciativaController],
  providers: [SubmoduloIniciativaService],
})
export class SubmoduloIniciativaModule {}
