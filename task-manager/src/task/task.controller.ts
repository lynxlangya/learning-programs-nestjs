import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '@/common/guard';
import { CurrentUser } from '@/common/decorators';
import { User } from '@prisma/client';
import { QueryTaskDto } from './dto/query-task.dto';
// import { failRes, successRes } from '@/common/utils';
// import { ServerResponseCode } from '@/common/enums';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.taskService.create(createTaskDto, currentUser);
  }

  @Get()
  findAll(@Query() query: QueryTaskDto, @CurrentUser() currentUser: User) {
    return this.taskService.findAll(query, currentUser);
  }

  @Get('/find-one-by-task-id/:id')
  findOneByTaskId(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.taskService.findOneByTaskId(id, currentUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.taskService.remove(id, currentUser);
  }
}
