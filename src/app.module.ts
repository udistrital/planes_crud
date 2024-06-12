import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoPlanModule } from './estado-plan/estado-plan.module';
import { EstadoSeguimientoModule } from './estado-seguimiento/estado-seguimiento.module';
import { FuentesApropiacionModule } from './fuentes-apropiacion/fuentes-apropiacion.module';
import { IdentificacionDetalleModule } from './identificacion-detalle/identificacion-detalle.module';
import { IdentificacionModule } from './identificacion/identificacion.module';
import { PeriodoSeguimientoModule } from './periodo-seguimiento/periodo-seguimiento.module';
import { PlanModule } from './plan/plan.module';
import { ReformulacionModule } from './reformulacion/reformulacion.module';
import { SeguimientoDetalleModule } from './seguimiento-detalle/seguimiento-detalle.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { SubgrupoDetalleModule } from './subgrupo-detalle/subgrupo-detalle.module';
import { SubgrupoModule } from './subgrupo/subgrupo.module';
import { TipoIdentificacionModule } from './tipo-identificacion/tipo-identificacion.module';
import { TipoPlanModule } from './tipo-plan/tipo-plan.module';
import { TipoSeguimientoModule } from './tipo-seguimiento/tipo-seguimiento.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@127.0.0.1:27017/udistrital?authSource=admin',
    ),
    // MongooseModule.forRoot(
    //   `mongodb://${environment.USER}:${environment.PASS}@` +
    //     `${environment.HOST}:${environment.PORT}/${environment.DB}?authSource=${environment.AUTH_DB}`,
    //   { useFindAndModify: false },
    // ),
    PlanModule,
    TipoPlanModule,
    SubgrupoModule,
    SubgrupoDetalleModule,
    EstadoPlanModule,
    IdentificacionModule,
    TipoIdentificacionModule,
    SeguimientoModule,
    TipoSeguimientoModule,
    EstadoSeguimientoModule,
    PeriodoSeguimientoModule,
    FuentesApropiacionModule,
    SeguimientoDetalleModule,
    IdentificacionDetalleModule,
    ReformulacionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
