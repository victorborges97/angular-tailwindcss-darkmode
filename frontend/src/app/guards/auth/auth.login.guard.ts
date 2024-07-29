// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role, RolePermissions } from 'src/app/auth/roles';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private location: Location,
        private toastr: ToastrService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.authService.loadUserFromStorage();

        if (this.authService.isLogged()) {
            console.log("isLogged");
            this.router.navigate(['/app']);
            return false;
        } else {
            console.log('not logged: ');
            return true;
        }
    }
}
