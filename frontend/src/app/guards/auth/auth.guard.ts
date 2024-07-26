// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Role, RolePermissions } from '../../../../../auth/roles';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const action = route.data['action'] as keyof typeof RolePermissions[Role];
        if (this.authService.hasPermission(action)) {
            return true;
        } else {
            this.router.navigate(['/forbidden']);
            return false;
        }
    }
}
