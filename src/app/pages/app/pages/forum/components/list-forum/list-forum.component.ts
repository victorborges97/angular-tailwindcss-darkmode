import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemForumComponent } from "./list-item-forum/list-item-forum.component";
import { Forum } from 'src/app/interfaces/forum';
import { ForumService } from 'src/app/services/forum/forum.service';

@Component({
    selector: 'app-list-forum',
    standalone: true,
    imports: [CommonModule, ListItemForumComponent],
    templateUrl: './list-forum.component.html',
})
export class ListForumComponent {
    foruns: Forum[] = [];
    loading = signal(false);

    ngOnInit() {
        this.fetchForums();
    }
    constructor(private forumService: ForumService) { }

    fetchForums() {
        this.loading.set(true);
        this.forumService.getAll("").then((data) => {
            this.foruns = data;
            this.loading.set(false);
        }).catch(e => {
            this.loading.set(false);
            alert(`Data: ${JSON.stringify(e.error)}`)
        })
    }
}
