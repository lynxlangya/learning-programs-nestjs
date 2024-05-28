import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { ChatModule } from '@/websocket/chat/chat.module';

@Module({
  imports: [PrismaModule, ChatModule],
  controllers: [TaskController],
  providers: [TaskService],
  // exports: [TaskService],
})
export class TaskModule {}
