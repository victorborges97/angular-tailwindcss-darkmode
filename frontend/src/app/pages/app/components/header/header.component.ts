import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppThemeService } from './../../../../app-theme.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <header
        class="flex justify-between items-center absolute top-0 left-0 right-0 z-10 p-5"
        [class.scrolled]="isScrolled && !isAtTop"
        [class.visible]="isScrolled && !isAtTop && isVisible"
        [class.at-top]="isAtTop"
    >
        <nav class="container mx-auto flex justify-between items-center">
            <a href="#" class="text-lg font-bold">
                <img src="https://wordpress-theme.spider-themes.net/docly/wp-content/themes/docly/assets/img/logo-w.png" alt="Docly Logo" class="h-8" />
            </a>
            <ul class="flex items-center gap-3">
                <li>
                    <button
                        class="flex transition-transform hover:scale-125 align-middle"
                        (click)="set()"
                    >
                        <span *ngIf="!darkMode()" class="material-icons"
                            >dark_mode</span
                        >
                        <span *ngIf="darkMode()" class="material-icons"
                            >light_mode</span
                        >
                    </button>
                </li>
                <li>
                    <a href="/" class="hover:text-gray-300"
                        >Home</a
                    >
                </li>
                <li>
                    <a href="#" class="hover:text-gray-300"
                        >Forums</a
                    >
                </li>
            </ul>
        </nav>
    </header>
  `,
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    isScrolled = false;
    isAtTop = true;
    lastScrollTop = 0;
    isVisible = true;
    constructor(private appTheme: AppThemeService) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const offset = window.pageYOffset || document.documentElement.scrollTop;
        this.isScrolled = offset > 0;
        this.isAtTop = offset === 0;

        if (offset > this.lastScrollTop) {
            // Rolando para baixo
            this.isVisible = false;
        } else {
            // Rolando para cima
            this.isVisible = true;
        }
        this.lastScrollTop = offset <= 0 ? 0 : offset;
    }

    darkMode() {
        return this.appTheme.darkMode;
    }

    set() {
        return this.appTheme.toggleDarkMode();
    }
}
