import { Controller, Post, Get, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { TipoPlanDto } from "./dto/tipo-plan.dto";
import { TipoPlanService } from "./tipo-plan.service";

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
    async getAll(@Res() res){
        const tipoPlan = await this.tipoPlanService.getAll();
        res.status(HttpStatus.OK).json(
            {
                Data: tipoPlan,
                Message: "Registration succesfull",
                Status: "201",
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
      const tipoPlan = await this.tipoPlanService.delete(id);
      if (!tipoPlan) throw new NotFoundException("not found resource");    
      return res.status(HttpStatus.OK).json({
        Data: {
          _id: id
        },
        Message: "Delete successfull",
        Status: "200",
        Success: true
      });
    }

    
}
