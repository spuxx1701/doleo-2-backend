import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.getArgByIndex(0);
    const dateIn = new Date();
    console.log(
      `${dateIn.toUTCString()} || ` +
        'Incoming request. ' +
        `URL: ${request.url}, Method: ${request.method}, ` +
        `from: ${request.ip}.`,
    );
    return next.handle().pipe(
      tap(() => {
        const dateOut = new Date();
        console.log(
          `${dateOut.toUTCString()} || ` +
            `Request served after ${dateOut.getTime() - dateIn.getTime()}ms.`,
        );
      }),
    );
  }
}
