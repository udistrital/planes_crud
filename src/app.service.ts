import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDefault(): Object{
    return{
      status: "OK",
    };

  }

}

