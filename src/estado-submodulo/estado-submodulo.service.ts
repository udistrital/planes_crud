import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { soloCampos } from '../comun/campos';
import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';
import {
  ActualizarEstadoSubmoduloDto,
  CAMPOS_ESTADO_SUBMODULO,
  CrearEstadoSubmoduloDto,
} from './dto/estado-submodulo.dto';
import {
  EstadoSubmodulo,
  EstadoSubmoduloDocument,
} from './schemas/estado-submodulo.schema';

@Injectable()
export class EstadoSubmoduloService {
  constructor(
    @InjectModel(EstadoSubmodulo.name)
    private readonly modelo: Model<EstadoSubmodulo>,
  ) {}

  crear(dto: CrearEstadoSubmoduloDto): Promise<EstadoSubmoduloDocument> {
    return this.modelo.create(soloCampos(dto, CAMPOS_ESTADO_SUBMODULO));
  }

  listar(filtro: FilterDto): Promise<EstadoSubmoduloDocument[]> {
    const filtros = new FiltersService(filtro);
    return this.modelo
      .find(
        filtros.getQuery(),
        filtros.getFields(),
        filtros.getLimitAndOffset(),
      )
      .sort(filtros.getSortBy())
      .exec();
  }

  async obtener(id: string): Promise<EstadoSubmoduloDocument> {
    const estado = await this.modelo.findById(id).exec();
    if (!estado) {
      throw new NotFoundException(`No existe el estado de submódulo ${id}.`);
    }
    return estado;
  }

  async actualizar(
    id: string,
    dto: ActualizarEstadoSubmoduloDto,
  ): Promise<EstadoSubmoduloDocument> {
    const estado = await this.modelo
      .findByIdAndUpdate(
        id,
        { $set: soloCampos(dto, CAMPOS_ESTADO_SUBMODULO) },
        { new: true, runValidators: true },
      )
      .exec();
    if (!estado) {
      throw new NotFoundException(`No existe el estado de submódulo ${id}.`);
    }
    return estado;
  }
}
