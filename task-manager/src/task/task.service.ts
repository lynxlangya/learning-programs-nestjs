import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, User, Role } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { successRes, failRes } from '@/common/utils';
import { ServerResponseCode } from '@/common/enums';
import { ApiResponse } from '@/common/interfaces';
import { QueryTaskDto } from './dto/query-task.dto';

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

  async findAll(
    query: QueryTaskDto,
    currentUser: User,
  ): Promise<
    ApiResponse<
      | {
          list: Task[];
          total: string;
          pageSize: string;
          pageNum: string;
        }
      | string
    >
  > {
    if (currentUser.role === Role.GUEST)
      return failRes(
        ServerResponseCode.FORBIDDEN,
        'Forbidden - 「游客无权访问」',
      );

    const { pageNum, pageSize, taskTitle, status } = query;
    const where: any = {};
    if (taskTitle) where.title = { contains: taskTitle };
    if (status) where.status = status;

    // 普通用户只能查看自己的任务
    if (currentUser.role === Role.NORMAL) {
      where.OR = [
        { creatorId: currentUser.id },
        { assigneeId: currentUser.id },
      ];
    }

    const list = await this.prisma.task.findMany({
      where,
      skip: (+pageNum - 1) * +pageSize,
      take: +pageSize,
    });

    const total = await this.prisma.task.count({ where });

    return successRes({
      list,
      total: String(total),
      pageSize,
      pageNum,
    });
  }

  async findOneByTaskId(
    taskId: string,
    currentUser: User,
  ): Promise<ApiResponse<Task | string>> {
    // 判断当前用户是否有权限查看该任务
    const task = await this.prisma.task.findUnique({
      where: { taskId },
    });

    if (!task) return failRes(ServerResponseCode.NOT_FOUND, '任务不存在');

    if (currentUser.role === Role.GUEST)
      return failRes(ServerResponseCode.FORBIDDEN, '游客无权访问');

    if (
      currentUser.role === Role.NORMAL &&
      task.creatorId !== currentUser.id &&
      task.assigneeId !== currentUser.id
    )
      return failRes(ServerResponseCode.FORBIDDEN, '无权查看该任务');

    return successRes(task);
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
