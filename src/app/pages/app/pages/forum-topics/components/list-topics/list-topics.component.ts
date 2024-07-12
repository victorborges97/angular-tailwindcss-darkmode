import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemTopicComponent } from '../list-item-topics/list-item-topics.component';

@Component({
    selector: 'app-list-topics',
    standalone: true,
    imports: [CommonModule, ListItemTopicComponent],
    templateUrl: './list-topics.component.html',
})
export class ListTopicsComponent {

}
