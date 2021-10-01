import { Query, Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, HttpException } from '@nestjs/common';
import { PlanDto } from "./dto/plan.dto";
import { PlanService } from "./plan.service";
import { FilterDto} from '../filters/dto/filter.dto';
import { SubgrupoService } from "../subgrupo/subgrupo.service"
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('plan')
export class PlanController {

    constructor(private planService: PlanService){}

    @Post()
    async post(@Res() res, @Body() planDto: PlanDto){
        const plan = await this.planService.post(planDto);
        res.status(HttpStatus.OK).json(
            {
                Data: plan,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto){
        const plan = await this.planService.getAll(filterDto);
        return res.status(HttpStatus.OK).json(
            {
                Data: plan,
                Message: "Request succesfull",
                Status: "200",
                Success: true
            });
    }

    @Get('/:id')
    async get(@Res() res, @Param('id') id : string){

        const plan = await this.planService.getById(id);
        if (!plan) throw new NotFoundException("not found resource")
        res.status(HttpStatus.OK).json(
            {
                Data: plan,
                Message: "Registration succesfull",
                Status: "201",
                Success: true
            });
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id : string, @Body() planDto : PlanDto){

        const plan = await this.planService.put(id, planDto);
        if (!plan) throw new NotFoundException("not found resource");    
        return res.status(HttpStatus.OK).json({
          Data: plan,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Put('/delete_plan/:id')
    async deletePlan(@Res() res, @Param('id') id : string){
        const plan =  await this.planService.getById(id)

        plan.activo = false
        if (!plan) throw new NotFoundException("not found resource");    
        const respuesta = await this.planService.put(id, plan);
        return res.status(HttpStatus.OK).json({
          Data: respuesta,
          Message: "Update successfull",
          Status: "200",
          Success: true
        });
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
      const plan = await this.planService.delete(id);
      if (!plan) throw new NotFoundException("not found resource");    
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
