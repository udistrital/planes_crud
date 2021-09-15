import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanModule } from './plan/plan.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoPlanModule } from './tipo-plan/tipo-plan.module';
import { SubgrupoModule } from './subgrupo/subgrupo.module';
import { SubgrupoDetalleModule } from './subgrupo-detalle/subgrupo-detalle.module';
import { environment } from "./config/configuration";



@Module({
<<<<<<< HEAD
  imports: [ MongooseModule.forRoot('mongodb://localhost/planes'), PlanModule, TipoPlanModule, SubgrupoModule, SubgrupoDetalleModule],
  /*imports: [ MongooseModule.forRoot(`mongodb://${environment.USER}:${environment.PASS}@`+
=======
  // imports: [ MongooseModule.forRoot('mongodb://localhost/planes'), PlanModule, TipoPlanModule, SubgrupoModule, SubgrupoDetalleModule],
  imports: [ MongooseModule.forRoot(`mongodb://${environment.USER}:${environment.PASS}@`+
>>>>>>> c169c9a1616dfe945f4c2fcfeafc72a4ac5535cd
  `${environment.HOST}:${environment.PORT}/${environment.DB}?authSource=${environment.AUTH_DB}`, 
  { useFindAndModify: false }) , PlanModule, TipoPlanModule, SubgrupoModule, SubgrupoDetalleModule],*/

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule{}


