import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    checkAuth() {

    }

    constructor(private http: HttpClient) { }

    header = {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
    };

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
