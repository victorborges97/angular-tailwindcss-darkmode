import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-image-user',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './image-user.component.html',
})
export class ImageUserComponent {
    @Input() class = "";
    @Input() src = "";
    @Input() alt = "";
}
