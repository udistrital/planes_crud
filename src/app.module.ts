import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanModule } from './plan/plan.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoPlanModule } from './tipo-plan/tipo-plan.module';
import { SubgrupoModule } from './subgrupo/subgrupo.module';
import { SubgrupoDetalleModule } from './subgrupo-detalle/subgrupo-detalle.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EstadoPlanModule } from './estado-plan/estado-plan.module';
import { IdentificacionModule } from './identificacion/identificacion.module';
import { TipoIdentificacionModule } from './tipo-identificacion/tipo-identificacion.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { TipoSeguimientoModule } from './tipo-seguimiento/tipo-seguimiento.module';
import { EstadoSeguimientoModule } from './estado-seguimiento/estado-seguimiento.module';
import { PeriodoSeguimientoModule } from './periodo-seguimiento/periodo-seguimiento.module';
import { FuentesApropiacionModule } from './fuentes-apropiacion/fuentes-apropiacion.module';
import { SeguimientoDetalleModule } from './seguimiento-detalle/seguimiento-detalle.module';
import { IdentificacionDetalleModule } from './identificacion-detalle/identificacion-detalle.module';


@Module({
  //imports: [ MongooseModule.forRoot('mongodb://127.0.0.1:27017/udistrital'), PlanModule, TipoPlanModule, SubgrupoModule, SubgrupoDetalleModule, EstadoPlanModule, IdentificacionModule, TipoIdentificacionModule, SeguimientoModule, TipoSeguimientoModule, EstadoSeguimientoModule, PeriodoSeguimientoModule, FuentesApropiacionModule],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const user = encodeURIComponent(configService.get<string>('PLANES_CRUD_USER') || '');
        const pass = encodeURIComponent(configService.get<string>('PLANES_CRUD_PASS') || '');
        const host = configService.get<string>('PLANES_CRUD_HOST');
        const port = configService.get<string>('PLANES_CRUD_PORT');
        const db = configService.get<string>('PLANES_CRUD_DB');
        const authDb = configService.get<string>('PLANES_CRUD_AUTH_DB');

        return {
          uri: `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=${authDb}`,
        };
      },
    }),
    PlanModule, TipoPlanModule, SubgrupoModule, SubgrupoDetalleModule,
    EstadoPlanModule, IdentificacionModule, TipoIdentificacionModule,
    SeguimientoModule, TipoSeguimientoModule, EstadoSeguimientoModule,
    PeriodoSeguimientoModule, FuentesApropiacionModule,
    SeguimientoDetalleModule, IdentificacionDetalleModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }

