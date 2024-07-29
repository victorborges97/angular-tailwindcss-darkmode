import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppThemeService } from './../../../../app-theme.service';
import { AuthUserSharedService } from 'src/app/services/auth/auth.user.shared.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <header
        class="flex justify-between items-center absolute top-0 left-0 right-0 z-10 p-5"
        [class.scrolled]="!hero || (isScrolled && !isAtTop)"
        [class.visible]="!hero || (isScrolled && !isAtTop && isVisible)"
        [class.at-top]="!hero ? false : isAtTop"
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
                <div class="flex items-center relative">
                    <img
                    [src]="authUserSharedService.getUser()?.imageUrl"
                    alt="User Image"
                    class="w-10 h-10 rounded-full cursor-pointer"
                    (click)="toggleDropdown()"
                    />
                    <div *ngIf="dropdownOpen">
                        <div class="fixed inset-0 bg-black opacity-0 z-10" (click)="closeDropdown()"></div>
                        <div class="absolute -left-36 mt-6 w-48 bg-white rounded-md shadow-lg z-20">
                            <button
                            (click)="goToUserProfile()"
                            class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 hover:rounded-md"
                            >
                            Perfil
                            </button>
                            <button
                            (click)="logout()"
                            class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 hover:rounded-md"
                            >
                            Sair
                            </button>
                        </div>
                    </div>
                </div>
                </li>
            </ul>
        </nav>
    </header>
    <div *ngIf="!hero" class="h-[80px]" ></div>
  `,
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    isScrolled = false;
    isAtTop = true;
    lastScrollTop = 0;
    isVisible = true;
    dropdownOpen = false;

    @Input() hero = true;

    constructor(
        private appTheme: AppThemeService,
        private authService: AuthService,
        public authUserSharedService: AuthUserSharedService,
        private router: Router,
    ) { }

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

    closeDropdown() {
        this.dropdownOpen = false;
    }
    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    goToUserProfile() {
        this.router.navigate(['/app/forum/user/', this.authUserSharedService.getUser()?.id]);
        this.closeDropdown();
    }

    logout() {
        this.authService.logout();
        this.closeDropdown();
    }
}
