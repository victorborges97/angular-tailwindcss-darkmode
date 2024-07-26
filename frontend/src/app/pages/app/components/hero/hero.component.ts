import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
})
export class HeroComponent {
    @ViewChild('searchInput') searchInput!: ElementRef;

    constructor(private router: Router, private route: ActivatedRoute) { }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // Verifique se não está na rota app/forum/:forumIdNumber/:tag
        const url = this.router.url;
        const regex = /^\/app\/forum\/\d+\/[^\/]+$/;

        if (!regex.test(url) && event.key === '/') {
            event.preventDefault(); // Evita a barra de pesquisa do navegador ou outros atalhos
            this.searchInput.nativeElement.focus();
        }
    }
}
