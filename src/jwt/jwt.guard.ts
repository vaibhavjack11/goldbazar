import { HttpStatus, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const Public = () => SetMetadata('roles', ['PUBLIC']);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    if (roles.includes('PUBLIC')) {
      return true;
    }

    const ctx: HttpArgumentsHost = context.switchToHttp();

    const req: Request = ctx.getRequest();

    const token: string | null = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!token) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    let user: any | null = null;

    try {
      const verified = this.jwt.verify(token);
      user = verified.user;
      
    } catch (e) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }
    if (!user) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    //eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzM1OTA1MzY1LCJleHAiOjE3NDEwODkzNjUsImlzcyI6InNhcmF0aHkifQ.KZNmaStye0ru7btxdHAAlqfcMjB862U4h-B3a2diNHtZ66Vq7H8TrPl_0AKUp_h6XuzFDxSU11BHjwfekSHmsjWx9wRNvRWENaO7y1HemMfI14HslBEpqiqhYiRn22sBjFk1lRy6fHWLA1QTvImizx-clBTuXAKHv24BQddjVFji6JMTNdzWwZTnKXnl8XQC9SoQs4W4X8aO_COtRwh6XXHk7t7s0FMybygrSexUcKSRKYS2slr7g5luIXjB0LaEiEHYPKrKziNlc51oBJhvhrM34jmmClhMkF3Ee7Dhgk1sgKY1McTL5XzhiKz6skt277wf3IYSroUsGbzfbDAuwQ


    if (!roles.includes(user.type) && !user?.isAdmin) {
      throw new HttpException('Forbidden.', 403);
    }

    req['user'] = user;

    return true;
  }
}
