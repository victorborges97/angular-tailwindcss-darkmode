/* eslint-disable prettier/prettier */
// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolePermissions } from '../roles';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Assumindo que o usuário está anexado ao request, por exemplo, por um AuthMiddleware
        const action = this.reflector.get<string>('action', context.getHandler());

        if (!user || !action) {
            throw new ForbiddenException('Access denied');
        }

        const role = user.role; // O papel do usuário deve estar disponível no objeto usuário
        if (RolePermissions[role][action]) {
            return true;
        }

        throw new ForbiddenException('Access denied');
    }
}
