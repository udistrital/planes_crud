import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyBulkWriteOperation, Model } from 'mongoose';
import { soloCampos } from '../comun/campos';
import { FilterDto } from '../filters/dto/filter.dto';
import { FiltersService } from '../filters/filters.service';
import {
  ActualizarElementoCatalogoDto,
  CAMPOS_ACTUALIZABLES,
  CAMPOS_CREACION,
  CrearElementoCatalogoDto,
  MAXIMO_POR_LOTE,
  ResultadoLoteDto,
} from './dto/elemento-catalogo.dto';
import {
  ElementoCatalogo,
  ElementoCatalogoDocument,
  PATRON_NOMBRE_CATALOGO,
} from './schemas/elemento-catalogo.schema';

const CODIGO_LLAVE_DUPLICADA = 11000;

@Injectable()
export class ElementoCatalogoService {
  constructor(
    @InjectModel(ElementoCatalogo.name)
    private readonly modelo: Model<ElementoCatalogo>,
  ) {}

  async crear(
    dto: CrearElementoCatalogoDto,
  ): Promise<ElementoCatalogoDocument> {
    try {
      return await this.modelo.create(soloCampos(dto, CAMPOS_CREACION));
    } catch (error) {
      if (error?.code === CODIGO_LLAVE_DUPLICADA) {
        throw new ConflictException(
          `Ya existe el código ${dto?.codigo} en el catálogo ${dto?.catalogo}.`,
        );
      }
      throw error;
    }
  }

  listar(filtro: FilterDto): Promise<ElementoCatalogoDocument[]> {
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

  async obtener(id: string): Promise<ElementoCatalogoDocument> {
    const elemento = await this.modelo.findById(id).exec();
    if (!elemento) {
      throw this.noExiste(id);
    }
    return elemento;
  }

  async actualizar(
    id: string,
    dto: ActualizarElementoCatalogoDto,
  ): Promise<ElementoCatalogoDocument> {
    const cambios = soloCampos(dto, CAMPOS_ACTUALIZABLES);
    if (Object.keys(cambios).length === 0) {
      throw new BadRequestException(
        'No se envió ningún campo para actualizar (catalogo y codigo no cambian).',
      );
    }
    const elemento = await this.modelo
      .findByIdAndUpdate(
        id,
        { $set: cambios },
        { new: true, runValidators: true },
      )
      .exec();
    if (!elemento) {
      throw this.noExiste(id);
    }
    return elemento;
  }

  /**
   * Crea o actualiza varios elementos en una sola operación, buscándolos por
   * catalogo + codigo. Cargar el mismo archivo dos veces no duplica nada. Los
   * elementos cargados quedan activos salvo que se envíe activo: false.
   */
  async cargarLote(
    elementos: CrearElementoCatalogoDto[],
  ): Promise<ResultadoLoteDto> {
    const operaciones = this.operacionesDeLote(elementos);
    const resultado = await this.modelo.bulkWrite(operaciones, {
      ordered: false,
    });
    const creados = resultado.upsertedCount;
    const actualizados = resultado.modifiedCount;
    return {
      recibidos: operaciones.length,
      creados,
      actualizados,
      sin_cambios: operaciones.length - creados - actualizados,
    };
  }

  private operacionesDeLote(
    elementos: CrearElementoCatalogoDto[],
  ): AnyBulkWriteOperation<ElementoCatalogo>[] {
    if (!Array.isArray(elementos) || elementos.length === 0) {
      throw new BadRequestException(
        'Se espera una lista con al menos un elemento.',
      );
    }
    if (elementos.length > MAXIMO_POR_LOTE) {
      throw new BadRequestException(
        `Envíe como máximo ${MAXIMO_POR_LOTE} elementos por lote.`,
      );
    }
    const vistos = new Set<string>();
    return elementos.map((elemento, posicion) => {
      const valido = this.elementoValido(elemento, posicion);
      const llave = `${valido.catalogo}|${valido.codigo}`;
      if (vistos.has(llave)) {
        throw new BadRequestException(
          `El código ${valido.codigo} del catálogo ${valido.catalogo} está repetido en el lote.`,
        );
      }
      vistos.add(llave);
      const { catalogo, codigo, ...datos } = valido;
      return {
        updateOne: {
          filter: { catalogo, codigo },
          update: { $set: datos },
          upsert: true,
        },
      };
    });
  }

  private elementoValido(
    elemento: CrearElementoCatalogoDto,
    posicion: number,
  ): ElementoCatalogo {
    const ubicacion = `Elemento ${posicion + 1}`;
    const catalogo = texto(elemento?.catalogo);
    const codigo = texto(elemento?.codigo);
    const nombre = texto(elemento?.nombre);
    if (!PATRON_NOMBRE_CATALOGO.test(catalogo)) {
      throw new BadRequestException(
        `${ubicacion}: catalogo debe tener solo minúsculas, números y guion bajo.`,
      );
    }
    if (!codigo || !nombre) {
      throw new BadRequestException(
        `${ubicacion}: codigo y nombre son obligatorios.`,
      );
    }
    const orden = elemento.orden ?? 0;
    if (!Number.isFinite(orden)) {
      throw new BadRequestException(`${ubicacion}: orden debe ser un número.`);
    }
    return {
      catalogo,
      codigo,
      nombre,
      padre: texto(elemento.padre),
      orden,
      activo: elemento.activo !== false,
    };
  }

  private noExiste(id: string): NotFoundException {
    return new NotFoundException(`No existe el elemento de catálogo ${id}.`);
  }
}

function texto(valor: unknown): string {
  return typeof valor === 'string' ? valor.trim() : '';
}
