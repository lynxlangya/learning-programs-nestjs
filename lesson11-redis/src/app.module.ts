import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: async (configService: ConfigService) => {
    //     const redisConfig = configService.get('redis');

    //     return {
    //       store: await redisStore({
    //         socket: {
    //           host: 'localhost',
    //           port: 6379,
    //         },
    //         ttl: 1000,
    //       }),
    //     };
    //   },
    // }),

    // TODO: 有问题
    CacheModule.register({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        // ttl: 1000,
        // db: 0,
      }),
      ttl: 1000,
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
