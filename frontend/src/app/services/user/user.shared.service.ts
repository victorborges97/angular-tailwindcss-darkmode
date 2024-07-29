import { Injectable, signal } from '@angular/core';
import { GetUserModel } from 'src/app/interfaces/user.model';

@Injectable({
    providedIn: 'root',
})
export class GetUserModelSharedService {
    private userSignal = signal<GetUserModel | null>(null);

    setUser(user: any) {
        this.userSignal.set(user);
    }

    getUser() {
        return this.userSignal();
    }

    user$ = this.userSignal;
}
