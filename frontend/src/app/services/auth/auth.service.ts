import { Role, RolePermissions } from './../../../../../auth/roles';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userRole: Role = Role.USER;

    constructor(private http: HttpClient) { }

    header = {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
    };

    getRole(): Role {
        return this.userRole;
    }

    setRole(role: Role) {
        this.userRole = role;
    }

    hasPermission(action: keyof typeof RolePermissions[Role]): boolean {
        const role = this.getRole();
        return RolePermissions[role][action];
    }

    isLogged() {
        return true;
    }

    public login(identifier: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/auth/login`, {
                identifier,
                password,
            }, this.header).subscribe({
                next: (data) => resolve(data),
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
}
