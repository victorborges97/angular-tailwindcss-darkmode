/* eslint-disable prettier/prettier */
import { Role, RolePermissions } from './../../../auth/roles';
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'action';
export const Roles = (action: keyof typeof RolePermissions[Role]) => SetMetadata(ROLES_KEY, action);
