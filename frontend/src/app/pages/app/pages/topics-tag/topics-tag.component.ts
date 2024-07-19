import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';

@Component({
    selector: 'app-topics-tag',
    standalone: true,
    imports: [CommonModule, ListTopicsComponent],
    templateUrl: './topics-tag.component.html',
})
export class TopicsTagComponent {
    tag: string = "";

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Recupera o parâmetro da rota
        this.tag = this.route.snapshot.paramMap.get('tag') ?? "";

        // Se você precisar observar mudanças no parâmetro (por exemplo, se a rota puder mudar dentro do mesmo componente), use:
        this.route.paramMap.subscribe(params => {
            this.tag = params.get('tag') ?? "";
            // Faça algo com o novo valor de tag
        });
    }
}
