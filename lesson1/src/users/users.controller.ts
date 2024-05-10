import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Other methods will be added here

  // The @Get() decorator tells Nest that the findAll() method should be called when a GET request is made to the /users route.
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // The @Get() decorator tells Nest that the findOne() method should be called when a GET request is made to the /users/:id route.
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  // The @Post() decorator tells Nest that the create() method should be called when a POST request is made to the /users route.
  @Post()
  create(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.usersService.create(user);
  }

  // The @Put() decorator tells Nest that the update() method should be called when a PUT request is made to the /users route.
  @Put()
  update(@Body(new ValidationPipe()) user: UpdateUserDto) {
    return this.usersService.update(user);
  }

  // The @Delete() decorator tells Nest that the remove() method should be called when a DELETE request is made to the /users route.
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
