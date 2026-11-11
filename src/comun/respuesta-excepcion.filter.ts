import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { Respuesta } from './respuesta';

const CODIGO_LLAVE_DUPLICADA = 11000;

interface ErrorTraducido {
  status: number;
  mensaje: string;
}

/**
 * Responde cualquier error con el sobre { Success, Status, Message, Data } y el
 * código HTTP real (los módulos antiguos responden 200 aunque fallen).
 * Se aplica con @UseFilters solo en los controladores nuevos.
 */
@Catch()
export class RespuestaExcepcionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RespuestaExcepcionFilter.name);

  catch(error: unknown, host: ArgumentsHost): void {
    const { status, mensaje } = this.traducir(error);
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(error);
    }
    const cuerpo: Respuesta<null> = {
      Success: false,
      Status: String(status),
      Message: mensaje,
      Data: null,
    };
    host.switchToHttp().getResponse<Response>().status(status).json(cuerpo);
  }

  private traducir(error: unknown): ErrorTraducido {
    if (error instanceof HttpException) {
      return { status: error.getStatus(), mensaje: this.mensajeHttp(error) };
    }
    if (
      error instanceof MongooseError.CastError ||
      error instanceof MongooseError.ValidationError
    ) {
      return { status: HttpStatus.BAD_REQUEST, mensaje: error.message };
    }
    if (this.esLlaveDuplicada(error)) {
      return {
        status: HttpStatus.CONFLICT,
        mensaje: 'Ya existe un registro con esos datos.',
      };
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      mensaje: 'Error interno del servidor.',
    };
  }

  private mensajeHttp(error: HttpException): string {
    const respuesta = error.getResponse();
    if (typeof respuesta === 'string') {
      return respuesta;
    }
    const mensaje = (respuesta as { message?: string | string[] }).message;
    return Array.isArray(mensaje)
      ? mensaje.join(' ')
      : (mensaje ?? error.message);
  }

  private esLlaveDuplicada(error: unknown): boolean {
    return (error as { code?: number })?.code === CODIGO_LLAVE_DUPLICADA;
  }
}
