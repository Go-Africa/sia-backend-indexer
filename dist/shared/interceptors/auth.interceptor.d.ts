import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class AuthInterceptor implements NestInterceptor {
    private username;
    private password;
    constructor(username: string, password: string);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
