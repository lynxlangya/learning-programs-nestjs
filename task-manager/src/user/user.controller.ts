import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { JwtAuthGuard } from '@/common/guard';
import { CurrentUser } from '@/common/decorators';
import { User } from '@prisma/client';
import { failRes } from '@/common/utils';
import { ServerResponseCode } from '@/common/enums';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: QueryUserDto) {
    return this.userService.findAll({
      ...query,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    // 必须用户本人才能修改自己的信息
    if (currentUser.id === id)
      return this.userService.update(id, updateUserDto);

    return failRes(
      ServerResponseCode.FORBIDDEN,
      'Forbidden - 「禁止访问」，只能修改自己的信息',
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
