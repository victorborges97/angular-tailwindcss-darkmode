import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Forum, ForumCreate } from 'src/app/interfaces/forum';
import { CountForuns } from 'src/app/interfaces/count.foruns';

@Injectable({
    providedIn: 'root',
})
export class ForumService {
    constructor(private http: HttpClient) { }
    header = {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
    };

    public getAll(search: string) {
        return new Promise<Forum[]>((resolve, reject) => {
            this.http.get<Forum[]>(`${environment.apiUrl}/foruns`, this.header).subscribe({
                next: (data) => resolve(data),
                error: (error) => reject(error),
            });
        });
    }

    public getCount() {
        return new Promise<CountForuns>((resolve, reject) => {
            this.http.get<CountForuns>(`${environment.apiUrl}/foruns/counts`, this.header).subscribe({
                next: (data) => resolve(data),
                error: (error) => reject(error),
            });
        });
    }

    public create(forum: ForumCreate) {
        return new Promise<any>((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/foruns`, forum, this.header).subscribe((data) => {
                resolve(data);
            }, error => {
                resolve(error);
            });
        });
    }
}
