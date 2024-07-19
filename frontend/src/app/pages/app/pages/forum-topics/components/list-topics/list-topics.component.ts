import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemTopicComponent } from '../list-item-topics/list-item-topics.component';
import { ForumService } from 'src/app/services/forum/forum.service';
import { ActivatedRoute } from '@angular/router';
import { Forum } from 'src/app/interfaces/forum';
import { TopicsService } from 'src/app/services/topics/model.service';
import { TopicModel } from 'src/app/interfaces/topic.model';

@Component({
    selector: 'app-list-topics',
    standalone: true,
    imports: [CommonModule, ListItemTopicComponent],
    templateUrl: './list-topics.component.html',
})
export class ListTopicsComponent {
    constructor(private topicsService: TopicsService, private route: ActivatedRoute) { }

    forumTag = "";
    topics: TopicModel[] = [];
    loading = signal(false);

    ngOnInit() {
        // Se você precisar observar mudanças no parâmetro (por exemplo, se a rota puder mudar dentro do mesmo componente), use:
        this.route.paramMap.subscribe(params => {
            this.forumTag = params.get('forumTag') ?? "";
            // Faça algo com o novo valor de forumTag
            this.fetchTopicsByForums();
        });
    }

    fetchTopicsByForums() {
        this.loading.set(true);
        this.topicsService.getAllByForumId(this.forumTag).then((data) => {
            this.topics = data;
            this.loading.set(false);
        }).catch(e => {
            this.loading.set(false);
            alert(`Data: ${JSON.stringify(e.error)}`)
        })
    }
}
