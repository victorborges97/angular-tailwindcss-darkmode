import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListForumComponent } from './components/list-forum/list-forum.component';
import { InfoAllForumComponent } from './components/info-all-forum/info-all-forum.component';

@Component({
    selector: 'app-forum',
    standalone: true,
    imports: [CommonModule, ListForumComponent, InfoAllForumComponent],
    templateUrl: "./forum.component.html",
})
export class ForumComponent {
}
