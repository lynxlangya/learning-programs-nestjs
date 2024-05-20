import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TesService } from './tes.service';
import { Te } from './entities/te.entity';
import { CreateTeInput } from './dto/create-te.input';
import { UpdateTeInput } from './dto/update-te.input';

@Resolver(() => Te)
export class TesResolver {
  constructor(private readonly tesService: TesService) {}

  @Mutation(() => Te)
  createTe(@Args('createTeInput') createTeInput: CreateTeInput) {
    return this.tesService.create(createTeInput);
  }

  @Query(() => [Te], { name: 'tes' })
  findAll() {
    return this.tesService.findAll();
  }

  @Query(() => Te, { name: 'te' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tesService.findOne(id);
  }

  @Mutation(() => Te)
  updateTe(@Args('updateTeInput') updateTeInput: UpdateTeInput) {
    return this.tesService.update(updateTeInput.id, updateTeInput);
  }

  @Mutation(() => Te)
  removeTe(@Args('id', { type: () => Int }) id: number) {
    return this.tesService.remove(id);
  }
}
