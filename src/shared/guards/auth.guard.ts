import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
import { jwtContant } from '../constants/auth.contant'
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private reflector : Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles)

    const request = context.switchToHttp().getRequest();

    let token = request.headers.authorization
    if (!token) {
      return false
    }
    
    let user = this.validateToken(token)
    if (!user) {
      throw new HttpException('invalid token', HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    }
    request.user = user
    return true
  }


  validateToken(fullToken: string) {
    const [bearer, token] = fullToken.split(' ')
    if (bearer != "Bearer") {
      return null
    }
    try {
      let user = jwt.verify(token, jwtContant.secretKey)
      return user
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    }
    return null
  }
}