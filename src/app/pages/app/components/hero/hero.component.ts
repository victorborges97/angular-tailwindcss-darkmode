import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
})
export class HeroComponent {
    @ViewChild('searchInput') searchInput!: ElementRef;

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === '/') {
            event.preventDefault(); // Evita a barra de pesquisa do navegador ou outros atalhos
            this.searchInput.nativeElement.focus();
        }
    }
}
