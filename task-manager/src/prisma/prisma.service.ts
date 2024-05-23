import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // 在应用程序启动时连接到数据库
  async onModuleInit() {
    await this.$connect();
  }

  // 在应用程序关闭时断开数据库连接
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
