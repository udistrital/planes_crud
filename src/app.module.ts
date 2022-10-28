import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanModule } from './plan/plan.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoPlanModule } from './tipo-plan/tipo-plan.module';
import { SubgrupoModule } from './subgrupo/subgrupo.module';
import { SubgrupoDetalleModule } from './subgrupo-detalle/subgrupo-detalle.module';
import { environment } from "./config/configuration";
import { EstadoPlanModule } from './estado-plan/estado-plan.module';
import { IdentificacionModule } from './identificacion/identificacion.module';
import { TipoIdentificacionModule } from './tipo-identificacion/tipo-identificacion.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { TipoSeguimientoModule } from './tipo-seguimiento/tipo-seguimiento.module';
import { EstadoSeguimientoModule } from './estado-seguimiento/estado-seguimiento.module';
import { PeriodoSeguimientoModule } from './periodo-seguimiento/periodo-seguimiento.module';



@Module({
  //imports: [ MongooseModule.forRoot('mongodb://localhost/planes'), PlanModule, TipoPlanModule, SubgrupoModule, SubgrupoDetalleModule, EstadoPlanModule, IdentificacionModule, TipoIdentificacionModule, SeguimientoModule, TipoSeguimientoModule, EstadoSeguimientoModule],
  imports: [MongooseModule.forRoot(`mongodb://${environment.USER}:${environment.PASS}@` +
    `${environment.HOST}:${environment.PORT}/${environment.DB}?authSource=${environment.AUTH_DB}`,
    { useFindAndModify: false }), PlanModule, TipoPlanModule, SubgrupoModule, SubgrupoDetalleModule, EstadoPlanModule, IdentificacionModule, TipoIdentificacionModule, SeguimientoModule, TipoSeguimientoModule, EstadoSeguimientoModule, PeriodoSeguimientoModule],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }


