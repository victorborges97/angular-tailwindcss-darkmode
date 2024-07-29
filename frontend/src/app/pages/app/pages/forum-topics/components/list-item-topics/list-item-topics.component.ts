import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TopicModel } from 'src/app/interfaces/topic.model';
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { strings as englishStrings } from "ngx-timeago/language-strings/pt-br";
import { ImageTopicForumComponent } from "../../../../components/image-topic-forum/image-topic-forum.component";
import { ImageUserComponent } from "../../../../components/image-user/image-user.component";

@Component({
    selector: 'app-list-item-topics',
    standalone: true,
    imports: [
        CommonModule,
        TimeagoModule,
        ImageTopicForumComponent,
        ImageUserComponent
    ],
    providers: [
        { provide: TimeagoClock, useClass: TimeagoDefaultClock },
        { provide: TimeagoIntl, useClass: TimeagoIntl },
        { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    ],
    templateUrl: './list-item-topics.component.html',
})
export class ListItemTopicComponent {
    [x: string]: any;
    @Input() item!: TopicModel;
    @Input() view: ViewListItemTopic = ViewListItemTopic.list;
    @Input() idUser: string | undefined;
    constructor(intl: TimeagoIntl) {
        intl.strings = englishStrings;
        intl.changes.next();
    }
}

export enum ViewListItemTopic {
    list,
    listDetailUser,
}
