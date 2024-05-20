import { Injectable } from '@nestjs/common';
import { CreateTeInput } from './dto/create-te.input';
import { UpdateTeInput } from './dto/update-te.input';

@Injectable()
export class TesService {
  create(createTeInput: CreateTeInput) {
    return 'This action adds a new te';
  }

  findAll() {
    return `This action returns all tes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} te`;
  }

  update(id: number, updateTeInput: UpdateTeInput) {
    return `This action updates a #${id} te`;
  }

  remove(id: number) {
    return `This action removes a #${id} te`;
  }
}
