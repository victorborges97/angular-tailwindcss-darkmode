import { Injectable, signal } from '@angular/core';
import { GetUserModel, UserModel } from 'src/app/interfaces/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthUserSharedService {
    private userSignal = signal<UserModel | null>({
        id: 1,
        usuario: "victorborges97",
        name: "João Victor",
        email: "borges.jvdo@gmail.com",
        imageUrl: "https://github.com/victorborges97.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'USER',
    });

    setUser(user: UserModel | null) {
        this.userSignal.set(user);
    }

    getUser() {
        return this.userSignal();
    }
}
