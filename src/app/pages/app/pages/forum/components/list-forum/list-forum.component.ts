import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemForumComponent } from "./list-item-forum/list-item-forum.component";

@Component({
    selector: 'app-list-forum',
    standalone: true,
    imports: [CommonModule, ListItemForumComponent],
    templateUrl: './list-forum.component.html',
})
export class ListForumComponent {

}
