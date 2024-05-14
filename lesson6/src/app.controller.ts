import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    throw new HttpException('Forbidden', HttpStatus.BAD_GATEWAY);

    // return this.appService.getHello();
  }
}
