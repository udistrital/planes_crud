import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ElementoCatalogoController } from './elemento-catalogo.controller';
import { ElementoCatalogoService } from './elemento-catalogo.service';
import {
  ElementoCatalogo,
  ElementoCatalogoSchema,
} from './schemas/elemento-catalogo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ElementoCatalogo.name, schema: ElementoCatalogoSchema },
    ]),
  ],
  controllers: [ElementoCatalogoController],
  providers: [ElementoCatalogoService],
})
export class ElementoCatalogoModule {}
