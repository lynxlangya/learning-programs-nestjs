import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class TimestampInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('TimestampInterceptor: Before...');
    const now = Date.now();

    return next.handle().pipe(
      tap(() => console.log(`TimestampInterceptor: After... ${now}`)),

      map((data) => {
        return { data, timestamp: now };
      }),
    );
  }
}
