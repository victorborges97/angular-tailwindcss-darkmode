import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role, RolePermissions } from 'src/app/auth/roles';
import { UserModel } from 'src/app/interfaces/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    http = inject(HttpClient);
    router = inject(Router);

    private userRole: Role = Role.USER;
    private user: UserModel | null = null;

    header = {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
    };

    getRole(): Role {
        return this.userRole;
    }

    setRole(role: Role) {
        this.userRole = role;
        localStorage.setItem('userRole', JSON.stringify(role));
    }

    getUser(): UserModel | null {
        return this.user;
    }

    setUser(user: UserModel | null) {
        this.user = user;
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }

    hasPermission(action: keyof typeof RolePermissions[Role]): boolean {
        const role = this.getRole();
        return RolePermissions[role][action];
    }

    isLogged() {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    setRefreshToken(refreshToken: string) {
        localStorage.setItem('refresh_token', refreshToken);
    }

    public login(identifier: string, password: string): Promise<UserModel> {
        return new Promise<UserModel>((resolve, reject) => {
            this.http.post<UserModel>(`${environment.apiUrl}/auth/login`, {
                identifier,
                password,
            }, this.header).subscribe({
                next: (data) => {
                    this.setToken(data.email);
                    // this.setRefreshToken(data.refresh_token);
                    this.setUser(data);
                    resolve(data);
                },
                error: (error) => reject(error),
            });
        });
    }

    public create(url: any, param: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http.post(url, param, this.header).subscribe((data) => {
                resolve(data);
            }, error => {
                resolve(error);
            });
        });
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        this.user = null;
        this.userRole = Role.USER;
        this.router.navigate(['/sign-in']);
    }

    public refreshToken(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return Promise.reject('No refresh token available');
        }

        return new Promise<void>((resolve, reject) => {
            this.http.post<any>(`${environment.apiUrl}/auth/refresh-token`, {
                refresh_token: refreshToken,
            }, this.header).subscribe({
                next: (data) => {
                    this.setToken(data.token);
                    resolve();
                },
                error: (error) => {
                    this.logout();
                    reject(error);
                },
            });
        });
    }

    loadUserFromStorage() {
        const storedUser = localStorage.getItem('user');
        const storedRole = localStorage.getItem('userRole');
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        }
        if (storedRole) {
            this.userRole = JSON.parse(storedRole);
        }
    }
}
