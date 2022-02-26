import { Query, Controller, Post, Get, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { TipoPlanDto } from "./dto/tipo-plan.dto";
import { TipoPlanService } from "./tipo-plan.service";
import { FilterDto} from '../filters/dto/filter.dto';

@Controller('tipo-plan')
export class TipoPlanController {

    constructor(private tipoPlanService: TipoPlanService){}

    @Post()
    async post(@Res() res, @Body() tipoPlanDto: TipoPlanDto){
        const tipoPlan = await this.tipoPlanService.post(tipoPlanDto);
        res.status(HttpStatus.OK).json(
            {
                Data: tipoPlan,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto){
        const tipoPlan = await this.tipoPlanService.getAll(filterDto);
        res.status(HttpStatus.OK).json(
            {
                Data: tipoPlan,
                Message: "Request succesfull",
                Status: "200",
                Success: true
            });
    }

    @Get('/:id')
    async get(@Res() res, @Param('id') id : string){

        const tipoPlan = await this.tipoPlanService.getById(id);
        res.status(HttpStatus.OK).json(
            {
                Data: tipoPlan,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() tipoPlanDto : TipoPlanDto){

        const tipoPlan = await this.tipoPlanService.put(id, tipoPlanDto);
        if (!tipoPlan) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: tipoPlan,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const tipoPlan = await this.tipoPlanService.getById(id);
      if (!tipoPlan) throw new NotFoundException("not found resource");    

      tipoPlan.activo = false
      const respuesta = await this.tipoPlanService.put(id, tipoPlan)
      return res.status(HttpStatus.OK).json({
        Data: respuesta,
        Message: "Delete successfull",
        Status: "200",
        Success: true
      });
    }

    
}
