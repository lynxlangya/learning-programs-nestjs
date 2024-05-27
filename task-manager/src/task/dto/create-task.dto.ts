import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  taskTitle: string; // 标题

  @IsEnum(Status)
  status: Status; // 状态

  @IsOptional()
  @IsString()
  content?: string; // 内容

  @IsString()
  assigneeId: string; // 被指派人

  @IsString()
  creatorId: string; // 创建人

  @IsOptional()
  @IsDateString()
  deadlineAt?: string; // 截止日期

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]; // 标签

  @IsOptional()
  @IsString()
  taskCover?: string; // 封面

  @IsOptional()
  @IsString()
  classification?: string; // 分类
}
