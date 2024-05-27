import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, User } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { successRes, failRes } from '@/common/utils';
import { ServerResponseCode } from '@/common/enums';
import { ApiResponse } from '@/common/interfaces';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(
    createTaskDto: CreateTaskDto,
    currentUser: User,
  ): Promise<Task | ApiResponse<null | string>> {
    try {
      await this.prisma.task.create({
        data: {
          ...createTaskDto,
          creatorId: currentUser.id,
          deadlineAt: createTaskDto.deadlineAt
            ? new Date(createTaskDto.deadlineAt)
            : null,
        },
      });
      return successRes(null);
    } catch (error) {
      return failRes(ServerResponseCode.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
