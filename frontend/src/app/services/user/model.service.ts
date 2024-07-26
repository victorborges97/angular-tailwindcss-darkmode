import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel, GetUserModel } from 'src/app/interfaces/user.model';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) { }
    header = {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
    };

    public getAll() {
        return new Promise<UserModel[]>((resolve, reject) => {
            this.http.get<UserModel[]>(`${environment.apiUrl}/users`, this.header).subscribe({
                next: (data) => resolve(data),
                error: (error) => reject(error),
            });
        });
    }

    public getUserById(id: string) {
        return new Promise<GetUserModel>((resolve, reject) => {
            this.http.get<GetUserModel>(`${environment.apiUrl}/users/${id}`, this.header).subscribe({
                next: (data) => resolve(data),
                error: (error) => reject(error),
            });
        });
    }
}
