import { effect, HostBinding, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppThemeService {

    constructor() {
        effect(() => {
            window.localStorage.setItem('darkMode', JSON.stringify(this.darkModeSignal()));
        });
    }

    darkModeSignal = signal<boolean>(
        JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
    );

    get darkMode() {
        return this.darkModeSignal;
    }

    toggleDarkMode() {
        this.darkModeSignal.set(!this.darkModeSignal());
    }
}
