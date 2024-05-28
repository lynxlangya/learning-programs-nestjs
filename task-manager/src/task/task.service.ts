import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, User, Role } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { successRes, failRes } from '@/common/utils';
import { ServerResponseCode } from '@/common/enums';
import { ApiResponse } from '@/common/interfaces';
import { QueryTaskDto } from './dto/query-task.dto';
import { ChatGateway } from '@/websocket/chat/chat.gateway';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private chatGateway: ChatGateway,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    currentUser: User,
  ): Promise<Task | ApiResponse<null | string>> {
    // 管理员权限下，必须指定任务接收者
    if (
      currentUser.role === Role.ADMIN &&
      !createTaskDto.assigneeId &&
      createTaskDto.assigneeId !== currentUser.id
    )
      return failRes(
        ServerResponseCode.BAD_REQUEST,
        '管理员必须指定任务接收者',
      );

    // 接受者
    const assigneeId =
      currentUser.role === Role.ADMIN
        ? createTaskDto.assigneeId
        : currentUser.id;

    try {
      await this.prisma.task.create({
        data: {
          ...createTaskDto,
          creatorId: currentUser.id,
          // 只有管理员可以指派任务给别人，普通用户只能给自己指派任务
          assigneeId,
          deadlineAt: createTaskDto.deadlineAt
            ? new Date(createTaskDto.deadlineAt)
            : null,
        },
      });

      // 任务创建成功后，通知客户端
      // this.chatGateway.server.emit('msgToClient', {
      //   type: 'task',
      //   action: 'create',
      //   data: {
      //     ...createTaskDto,
      //   },
      // });

      // 任务创建后，通知接收者
      this.chatGateway.sendToUser(assigneeId, {
        type: 'task',
        action: 'create',
        info: '你有新的任务，请注意查收！',
        data: {
          ...createTaskDto,
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

  update(id: string, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return `This action updates a #${id} task`;
  }

  async remove(
    taskId: string,
    currentUser: User,
  ): Promise<ApiResponse<Task | string>> {
    const task = await this.prisma.task.findUnique({
      where: { taskId },
    });

    if (!task) return failRes(ServerResponseCode.NOT_FOUND, '任务不存在');

    if (currentUser.role === Role.GUEST)
      return failRes(ServerResponseCode.FORBIDDEN, '游客无权操作');

    if (
      currentUser.role === Role.NORMAL &&
      task.creatorId !== currentUser.id &&
      task.assigneeId !== currentUser.id
    )
      return failRes(ServerResponseCode.FORBIDDEN, '无权删除该任务');

    await this.prisma.task.delete({ where: { taskId } });

    return successRes(null);
  }
}
