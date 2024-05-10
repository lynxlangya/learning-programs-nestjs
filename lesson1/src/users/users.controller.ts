import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService, IUser } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Other methods will be added here

  // The @Get() decorator tells Nest that the findAll() method should be called when a GET request is made to the /users route.
  @Get()
  findAll(): { message: string; data: IUser[] } {
    // Use the User type as the return type
    return this.usersService.findAll();
  }

  // The @Post() decorator tells Nest that the create() method should be called when a POST request is made to the /users route.
  @Post()
  create(@Body() user: IUser) {
    return this.usersService.create(user);
  }

  // The @Put() decorator tells Nest that the update() method should be called when a PUT request is made to the /users route.
  @Put()
  update(@Body() user: IUser) {
    return this.usersService.update(user);
  }

  // The @Delete() decorator tells Nest that the remove() method should be called when a DELETE request is made to the /users route.
  @Delete()
  remove(@Param('id') userId: number) {
    return this.usersService.remove(userId);
  }

  // The @Get() decorator tells Nest that the findOne() method should be called when a GET request is made to the /users/:id route.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }
}
