import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { soloCampos } from '../comun/campos';
import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';
import {
  ActualizarSubmoduloIniciativaDto,
  AgregarObservacionDto,
  CAMPOS_ACTUALIZABLES,
  CAMPOS_CREACION,
  CrearSubmoduloIniciativaDto,
} from './dto/submodulo-iniciativa.dto';
import {
  MAXIMO_TEXTO_OBSERVACION,
  Observacion,
  SubmoduloIniciativa,
  SubmoduloIniciativaDocument,
} from './schemas/submodulo-iniciativa.schema';

@Injectable()
export class SubmoduloIniciativaService {
  constructor(
    @InjectModel(SubmoduloIniciativa.name)
    private readonly modelo: Model<SubmoduloIniciativa>,
  ) {}

  crear(
    dto: CrearSubmoduloIniciativaDto,
  ): Promise<SubmoduloIniciativaDocument> {
    return this.modelo.create(soloCampos(dto, CAMPOS_CREACION));
  }

  /** Crea todos los submódulos de una iniciativa en una sola operación. */
  async crearLote(
    dtos: CrearSubmoduloIniciativaDto[],
  ): Promise<SubmoduloIniciativaDocument[]> {
    if (!Array.isArray(dtos) || dtos.length === 0) {
      throw new BadRequestException(
        'Se espera una lista con al menos un submódulo.',
      );
    }
    const documentos = await this.modelo.insertMany(
      dtos.map((dto) => soloCampos(dto, CAMPOS_CREACION)),
      { ordered: true },
    );
    return documentos as unknown as SubmoduloIniciativaDocument[];
  }

  listar(filtro: FilterDto): Promise<SubmoduloIniciativaDocument[]> {
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

  async obtener(id: string): Promise<SubmoduloIniciativaDocument> {
    const submodulo = await this.modelo.findById(id).exec();
    if (!submodulo) {
      throw this.noExiste(id);
    }
    return submodulo;
  }

  /**
   * Actualiza solo si la versión enviada es la vigente (bloqueo optimista).
   * La condición y el incremento van en la misma operación atómica.
   */
  async actualizar(
    id: string,
    dto: ActualizarSubmoduloIniciativaDto,
  ): Promise<SubmoduloIniciativaDocument> {
    const version = this.versionEsperada(dto);
    const cambios = soloCampos(dto, CAMPOS_ACTUALIZABLES);
    if (Object.keys(cambios).length === 0) {
      throw new BadRequestException(
        'No se envió ningún campo para actualizar.',
      );
    }

    const actualizada = await this.modelo
      .findOneAndUpdate(
        { _id: id, version },
        { $set: cambios, $inc: { version: 1 } },
        { new: true, runValidators: true },
      )
      .exec();
    if (actualizada) {
      return actualizada;
    }
    if (!(await this.modelo.exists({ _id: id }).exec())) {
      throw this.noExiste(id);
    }
    throw new ConflictException(
      'El submódulo cambió desde que se consultó. Vuelva a cargarlo antes de guardar.',
    );
  }

  /**
   * Agrega una observación al historial con la fecha del servidor. No cambia
   * `version`: un comentario no choca con quien está editando los datos. Si se
   * envía estado_submodulo_id, el estado cambia en la misma operación atómica.
   */
  async agregarObservacion(
    id: string,
    dto: AgregarObservacionDto,
  ): Promise<SubmoduloIniciativaDocument> {
    const cambios: UpdateQuery<SubmoduloIniciativa> = {
      $push: { observaciones: this.observacionValida(dto) },
    };
    const estado = this.estadoOpcional(dto?.estado_submodulo_id);
    if (estado) {
      cambios.$set = { estado_submodulo_id: estado };
    }

    const actualizada = await this.modelo
      .findByIdAndUpdate(id, cambios, { new: true, runValidators: true })
      .exec();
    if (!actualizada) {
      throw this.noExiste(id);
    }
    return actualizada;
  }

  private observacionValida(dto: AgregarObservacionDto): Observacion {
    const texto = textoLimpio(dto?.texto);
    const rol = textoLimpio(dto?.rol);
    const usuario = textoLimpio(dto?.usuario);
    if (!texto) {
      throw new BadRequestException('texto es obligatorio.');
    }
    if (texto.length > MAXIMO_TEXTO_OBSERVACION) {
      throw new BadRequestException(
        `texto no puede superar ${MAXIMO_TEXTO_OBSERVACION} caracteres.`,
      );
    }
    if (!rol || !usuario) {
      throw new BadRequestException('rol y usuario son obligatorios.');
    }
    return {
      texto,
      rol,
      usuario,
      fecha: new Date(),
    };
  }

  private estadoOpcional(estado: unknown): string {
    if (estado === undefined || estado === null || estado === '') {
      return '';
    }
    if (typeof estado !== 'string') {
      throw new BadRequestException('estado_submodulo_id debe ser texto.');
    }
    return estado;
  }

  private versionEsperada(dto: ActualizarSubmoduloIniciativaDto): number {
    const version = Number(dto?.version);
    if (!Number.isInteger(version) || version < 0) {
      throw new BadRequestException(
        'version es obligatoria y debe ser un entero mayor o igual a 0.',
      );
    }
    return version;
  }

  private noExiste(id: string): NotFoundException {
    return new NotFoundException(`No existe el submódulo de iniciativa ${id}.`);
  }
}

function textoLimpio(valor: unknown): string {
  return typeof valor === 'string' ? valor.trim() : '';
}
