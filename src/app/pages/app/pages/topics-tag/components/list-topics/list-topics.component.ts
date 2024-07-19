import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsService } from 'src/app/services/topics/model.service';
import { ActivatedRoute } from '@angular/router';
import { TopicModel } from 'src/app/interfaces/topic.model';
import { ListItemTopicComponent } from '../../../forum-topics/components/list-item-topics/list-item-topics.component';

@Component({
    selector: 'app-list-topics',
    standalone: true,
    imports: [CommonModule, ListItemTopicComponent],
    templateUrl: './list-topics.component.html',
})
export class ListTopicsComponent {
    constructor(private topicsService: TopicsService, private route: ActivatedRoute) { }

    tag = "";
    topics: TopicModel[] = [];
    loading = signal(false);

    ngOnInit() {
        // Se você precisar observar mudanças no parâmetro (por exemplo, se a rota puder mudar dentro do mesmo componente), use:
        this.route.paramMap.subscribe(params => {
            this.tag = params.get('tag') ?? "";
            // Faça algo com o novo valor de tag
            this.fetchTopicsByForums();
        });
    }

    fetchTopicsByForums() {
        this.loading.set(true);
        this.topicsService.getAllByTag(this.tag).then((data) => {
            this.topics = data;
            this.loading.set(false);
        }).catch(e => {
            this.loading.set(false);
            alert(`Data: ${JSON.stringify(e.error)}`)
        })
    }
}
