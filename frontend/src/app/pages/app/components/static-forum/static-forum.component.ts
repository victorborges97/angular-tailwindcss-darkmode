import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountForuns } from 'src/app/interfaces/count.foruns';
import { ForumService } from 'src/app/services/forum/forum.service';

@Component({
    selector: 'app-static-forum',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './static-forum.component.html',
})
export class StaticForumComponent {
    forumServices = inject(ForumService)

    loadingCount = signal(false);
    count = signal<CountForuns>({
        comments: 0,
        foruns: 0,
        tags: 0,
        topics: 0,
        users: 0
    });

    ngOnInit() {
        this.fetchCounts();
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
