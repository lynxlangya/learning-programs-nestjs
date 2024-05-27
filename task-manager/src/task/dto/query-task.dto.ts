import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class QueryTaskDto {
  @IsInt()
  @Type(() => String)
  pageNum: string = '1';

  @IsInt()
  @Type(() => String)
  pageSize: string = '10';

  @IsOptional()
  @IsString()
  taskTitle?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
