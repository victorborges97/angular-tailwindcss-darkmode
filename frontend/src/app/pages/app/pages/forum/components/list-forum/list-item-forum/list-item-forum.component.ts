import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Forum } from 'src/app/interfaces/forum';
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { strings as englishStrings } from "ngx-timeago/language-strings/pt-br";

@Component({
    selector: 'app-list-item-forum',
    standalone: true,
    imports: [
        CommonModule,
        TimeagoModule,
    ],
    providers: [
        { provide: TimeagoClock, useClass: TimeagoDefaultClock },
        { provide: TimeagoIntl, useClass: TimeagoIntl },
        { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    ],
    templateUrl: './list-item-forum.component.html',
})
export class ListItemForumComponent {
    @Input() item!: Forum;

    constructor(intl: TimeagoIntl) {
        intl.strings = englishStrings;
        intl.changes.next();
    }

    get getTotalTopics() {
        return this.item.topics.length > 0 ? this.item.topics.length : 0;
    }

    get getTotalComments() {
        return this.item.topics.length > 0 ? this.item.topics.map(t => t._count.comments).reduce((a, b) => a + b, 0) : 0;
    }
}
