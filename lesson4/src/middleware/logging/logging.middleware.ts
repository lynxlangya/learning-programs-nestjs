import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    // Print the request method and path
    console.log(`${req.method} ${req.path}`);
    // Print the request body
    console.log('Query:', req.query);

    next();
  }
}
