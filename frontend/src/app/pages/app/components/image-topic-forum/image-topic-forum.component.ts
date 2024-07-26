import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-image-topic-forum',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './image-topic-forum.component.html',
})
export class ImageTopicForumComponent {
    @Input() class = "";
    @Input() src = "";
    @Input() alt = "";
}
