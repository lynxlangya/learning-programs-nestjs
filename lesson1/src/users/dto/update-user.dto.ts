import { IsString, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  name: string;
}
