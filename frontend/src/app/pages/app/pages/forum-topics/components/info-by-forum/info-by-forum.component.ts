import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticForumComponent } from "../../../../components/static-forum/static-forum.component";

@Component({
    selector: 'app-info-by-forum',
    standalone: true,
    imports: [CommonModule, StaticForumComponent],
    templateUrl: './info-by-forum.component.html'
})
export class InfoByForumComponent {

}
