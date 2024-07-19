import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TopicModel } from 'src/app/interfaces/topic.model';
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { strings as englishStrings } from "ngx-timeago/language-strings/pt-br";

@Component({
    selector: 'app-list-item-topics',
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
    templateUrl: './list-item-topics.component.html',
})
export class ListItemTopicComponent {
    @Input() item!: TopicModel;
    forumTag: string = "";

    constructor(intl: TimeagoIntl, private route: ActivatedRoute) {
        intl.strings = englishStrings;
        intl.changes.next();
    }

    ngOnInit(): void {
        // Recupera o parâmetro da rota
        this.forumTag = this.route.snapshot.paramMap.get('forumTag') ?? "";
    }

    getUrlTopic(topicTag: string) {
        return `app/forum/${this.forumTag}/${topicTag}`
    }

    getUrlForum() {
        return `app/forum/${this.forumTag}`
    }
}
