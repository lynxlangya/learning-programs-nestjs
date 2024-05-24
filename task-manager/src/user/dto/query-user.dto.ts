import { IsOptional, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryUserDto {
  @IsInt()
  @Type(() => String)
  pageNum: string = '1';

  @IsInt()
  @Type(() => String)
  pageSize: string = '10';

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
