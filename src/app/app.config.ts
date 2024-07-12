import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CardGridComponent } from './pages/card-grid.component';
import { AppAdminComponent } from './pages/app/app-admin.component';
import { ForumComponent } from './pages/app/pages/forum/forum.component';
import { ForumTopicsComponent } from './pages/app/pages/forum-topics/forum-topics.component';
import { ForumTopicComponent } from './pages/app/pages/forum-topic/forum-topic.component';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter([
            {
                path: '',
                component: CardGridComponent,
            },

            {
                path: 'app',
                component: AppAdminComponent,
                children: [
                    { path: "", redirectTo: "forum", pathMatch: "full" },
                    {
                        path: 'forum',
                        component: ForumComponent
                    },
                    {
                        path: 'forum/:forumTag',
                        component: ForumTopicsComponent
                    },
                    {
                        path: 'forum/:forumTag/:topicTag',
                        component: ForumTopicComponent
                    }
                ]
            },

            // { path: '**', component: PageNotFoundComponent }
        ])
    ]
};
