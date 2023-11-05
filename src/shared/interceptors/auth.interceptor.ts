import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private username: string, private password: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Get the request object
    const request = context.switchToHttp().getRequest();

    // Create a Basic authorization string by encoding the username and password in base64
    const base64Credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    
    // Add the Basic authorization header to the request object
    request.headers['Authorization'] = `Basic ${base64Credentials}`;
    log("headers requests", request.headers)

    return next.handle();
  }
}
