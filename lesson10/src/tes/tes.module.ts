import { Module } from '@nestjs/common';
import { TesService } from './tes.service';
import { TesResolver } from './tes.resolver';

@Module({
  providers: [TesResolver, TesService],
})
export class TesModule {}
