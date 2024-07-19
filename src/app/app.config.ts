import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CardGridComponent } from './pages/card-grid.component';
import { AppAdminComponent } from './pages/app/app-admin.component';
import { ForumComponent } from './pages/app/pages/forum/forum.component';
import { ForumTopicsComponent } from './pages/app/pages/forum-topics/forum-topics.component';
import { ForumTopicComponent } from './pages/app/pages/forum-topic/forum-topic.component';
import { TopicsTagComponent } from './pages/app/pages/topics-tag/topics-tag.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter([
            {
                path: '',
                component: CardGridComponent,
            },

            {
                path: 'sign-up',
                component: SignupComponent,
            },

            {
                path: 'sign-in',
                component: SigninComponent,
            },

            {
                path: 'app',
                component: AppAdminComponent,
                children: [
                    { path: "", redirectTo: "forum", pathMatch: "full" },
                    {
                        path: 'forum',
                        component: ForumComponent,
                        data: { breadcrumb: 'Forum' }
                    },
                    {
                        path: 'forum/:forumTag',
                        component: ForumTopicsComponent,
                        data: { breadcrumb: 'Forum Topics' }
                    },
                    {
                        path: 'forum/topico-tag/:tag',
                        component: TopicsTagComponent,
                        data: { breadcrumb: 'Tag' }
                    },
                    {
                        path: 'forum/:forumTag/:topicTag',
                        component: ForumTopicComponent,
                        pathMatch: 'full',
                        data: { breadcrumb: 'Topic' }
                    },
                ]
            },

            // { path: '**', component: PageNotFoundComponent }
        ]),
        provideHttpClient(),
    ]
};
