import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      // Apply the middleware to all routes [为所有路由应用中间件]
      .forRoutes('*');
  }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply((req, res, next) => {
  //       console.log('Request...');
  //       console.log(`${req.method} ${req.path}`);
  //       console.log('Query:', req.query);
  //       next();
  //     })
  //     .forRoutes('*');
  // }
}
