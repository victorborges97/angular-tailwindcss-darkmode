import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppThemeService } from './app-theme.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
    ],
    templateUrl: "./app.component.html",
})
export class AppComponent {
    constructor(public darkModeService: AppThemeService) { }

    @HostBinding('class.dark') get mode() {
        return this.darkModeService.darkModeSignal();
    }
}
