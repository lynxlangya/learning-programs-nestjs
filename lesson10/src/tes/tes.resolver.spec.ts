import { Test, TestingModule } from '@nestjs/testing';
import { TesResolver } from './tes.resolver';
import { TesService } from './tes.service';

describe('TesResolver', () => {
  let resolver: TesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TesResolver, TesService],
    }).compile();

    resolver = module.get<TesResolver>(TesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
