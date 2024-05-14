import { Controller, Get, NotFoundException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { NotFoundExceptionFilter } from './filters/not-found-exception/not-found-exception.filter';

@Controller()
@UseFilters(NotFoundExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  findOne() {
    // 假设这里发生了找不到用户的情况
    throw new NotFoundException('User not found');
  }
}
