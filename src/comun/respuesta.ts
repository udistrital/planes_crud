import { HttpStatus } from '@nestjs/common';

/** Sobre de respuesta común a las tres capas de SISGPLAN. */
export interface Respuesta<T> {
  Success: boolean;
  Status: string;
  Message: string;
  Data: T;
}

export function respuestaExitosa<T>(
  data: T,
  status: HttpStatus = HttpStatus.OK,
  mensaje = 'Request successful',
): Respuesta<T> {
  return {
    Success: true,
    Status: String(status),
    Message: mensaje,
    Data: data,
  };
}
