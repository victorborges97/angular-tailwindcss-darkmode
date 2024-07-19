import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsService } from 'src/app/services/topics/model.service';
import { RecentTopicModel } from 'src/app/interfaces/recent.topic.model';
import { delay } from 'rxjs';
import { CountForuns } from 'src/app/interfaces/count.foruns';
import { ForumService } from 'src/app/services/forum/forum.service';

@Component({
    selector: 'app-info-all-forum',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './info-all-forum.component.html'
})
export class InfoAllForumComponent {

    constructor(
        private topicsService: TopicsService,
        private forumServices: ForumService,
    ) { }

    loadingTopics = signal(false);
    topics = signal<RecentTopicModel[]>([]);

    loadingCount = signal(false);
    count = signal<CountForuns>({
        comments: 0,
        foruns: 0,
        tags: 0,
        topics: 0,
        users: 0
    });

    ngOnInit() {
        this.fetchTopic();
        this.fetchCounts();
    }

    async fetchTopic() {
        this.loadingTopics.set(true);
        await new Promise((req, res) => setTimeout(() => req(""), 300));
        this.topicsService.getAllRecents(5).then((data) => {
            this.topics.set(data);
            this.loadingTopics.set(false);
        }).catch(e => {
            this.loadingTopics.set(false);
            alert(`Data: ${JSON.stringify(e.error)}`)
        })
    }

    async fetchCounts() {
        this.loadingCount.set(true);
        await new Promise((req, res) => setTimeout(() => req(""), 300));
        this.forumServices.getCount().then((data) => {
            this.count.set(data);
            this.loadingCount.set(false);
        }).catch(e => {
            this.loadingCount.set(false);
            alert(`Data: ${JSON.stringify(e.error)}`)
        })
    }
}
