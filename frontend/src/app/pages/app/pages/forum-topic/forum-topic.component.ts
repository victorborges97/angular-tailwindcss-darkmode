import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsService } from 'src/app/services/topics/model.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GetTopicModel } from 'src/app/interfaces/get.topic.model';
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { strings as englishStrings } from "ngx-timeago/language-strings/pt-br";
import { filter } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import 'quill-emoji'

@Component({
    selector: 'app-forum-topic',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TimeagoModule,
        QuillModule,
    ],
    providers: [
        { provide: TimeagoClock, useClass: TimeagoDefaultClock },
        { provide: TimeagoIntl, useClass: TimeagoIntl },
        { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    ],
    templateUrl: './forum-topic.component.html',
    styleUrls: ['./forum-topic.component.css'],
})
export class ForumTopicComponent {
    constructor(
        intl: TimeagoIntl,
        private topicsService: TopicsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        intl.strings = englishStrings;
        intl.changes.next();
    }
    topicTag = "";
    loading = signal(false);
    topic = signal<GetTopicModel | null>(null);

    htmlText = "<p>Testing</p>";

    quillConfig = {
        // toolbar: '.toolbar',
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['code-block'],
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                //[{ 'direction': 'rtl' }],                         // text direction

                //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                //[{ 'font': [] }],
                //[{ 'align': [] }],

                ['clean'],                                         // remove formatting button

                ['link'],
                // ['link', 'image', 'video']
                ['emoji'],
            ],
            handlers: { 'emoji': function () { } }
        },
        //autoLink: true,

        // mention: {
        //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        //   mentionDenotationChars: ["@", "#"],
        //   source: (searchTerm, renderList, mentionChar) => {
        //     let values;

        //     if (mentionChar === "@") {
        //       values = this.atValues;
        //     } else {
        //       values = this.hashValues;
        //     }

        //     if (searchTerm.length === 0) {
        //       renderList(values, searchTerm);
        //     } else {
        //       const matches = [];
        //       for (var i = 0; i < values.length; i++)
        //         if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
        //       renderList(matches, searchTerm);
        //     }
        //   },
        // },
        "emoji-toolbar": true,
        "emoji-textarea": false,
        "emoji-shortname": true,
    }

    ngOnInit() {

        // Se você precisar observar mudanças no parâmetro (por exemplo, se a rota puder mudar dentro do mesmo componente), use:
        this.loading.set(true);
        this.route.paramMap.subscribe(params => {
            this.topicTag = params.get('topicTag') ?? "";
            // Faça algo com o novo valor de topicTag
            this.fetchTopic();
        });

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.updateBreadcrumb();
        });
    }

    updateBreadcrumb(): void {
        // Simulação da recuperação do tópico da API
        const topicFromApi = 'Novo Tópico';

        // Atualizando os dados da rota dinamicamente
        this.route.snapshot.data['breadcrumbData'] = topicFromApi;

        // Se você estiver usando um serviço de breadcrumb, atualize-o aqui
        // breadcrumbService.set({ breadcrumb: 'Topic', breadcrumbData: topicFromApi });
    }

    fetchTopic() {
        this.loading.set(true);
        this.topicsService.getTopicBySlug(this.topicTag).then((data) => {
            this.topic.set(data);
            this.loading.set(false);
        }).catch(e => {
            this.loading.set(false);
            alert(`Data: ${JSON.stringify(e.error)}`)
        })
    }

    onSave() {
        alert("teste: " + this.htmlText)
    }

    onSelectionChanged = (event: any) => {
        if (event.range == null) {
            this.onBlur();
        }
    }

    onContentChanged = (event: any) => {
        console.log(event.html);
        this.htmlText = event.html;
    }

    onBlur = () => {
        console.log("Blurred");
    }

    ngOnDestroy() {

    }
}
