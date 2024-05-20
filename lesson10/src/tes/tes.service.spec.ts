import { Test, TestingModule } from '@nestjs/testing';
import { TesService } from './tes.service';

describe('TesService', () => {
  let service: TesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TesService],
    }).compile();

    service = module.get<TesService>(TesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
