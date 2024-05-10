import { IsString } from 'class-validator';

export class CreateUserDto {
  // @IsInt()
  // @Min(1)
  // id: number;

  @IsString()
  name: string;
}
