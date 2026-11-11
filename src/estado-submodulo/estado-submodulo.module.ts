import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstadoSubmoduloController } from './estado-submodulo.controller';
import { EstadoSubmoduloService } from './estado-submodulo.service';
import {
  EstadoSubmodulo,
  EstadoSubmoduloSchema,
} from './schemas/estado-submodulo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EstadoSubmodulo.name, schema: EstadoSubmoduloSchema },
    ]),
  ],
  controllers: [EstadoSubmoduloController],
  providers: [EstadoSubmoduloService],
})
export class EstadoSubmoduloModule {}
