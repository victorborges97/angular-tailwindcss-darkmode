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
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ForumUserComponent } from './pages/app/pages/forum-user/forum-user.component';
import { UserProfileComponent } from './pages/app/pages/forum-user/user-profile/user-profile.component';
import { UserTopicsComponent } from './pages/app/pages/forum-user/user-topics/user-topics.component';
import { UserCommentsComponent } from './pages/app/pages/forum-user/user-comments/user-comments.component';
import { UserFavoritesComponent } from './pages/app/pages/forum-user/user-favorites/user-favorites.component';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthLoginGuard } from './guards/auth/auth.login.guard';
import { AuthRegisterGuard } from './guards/auth/auth.register.guard';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        provideRouter([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'sign-in'
            },

            {
                path: 'sign-up',
                component: SignupComponent,
                canActivate: [AuthRegisterGuard],
            },

            {
                path: 'sign-in',
                component: SigninComponent,
                canActivate: [AuthLoginGuard],
            },

            {
                path: 'app',
                component: AppAdminComponent,
                children: [
                    { path: "", redirectTo: "forum", pathMatch: "full" },
                    {
                        path: 'forum/user/:id',
                        component: ForumUserComponent,
                        data: { breadcrumb: 'User', breadcrumbData: '', hero: false },
                        children: [
                            { path: "", redirectTo: "profile", pathMatch: "full" },
                            {
                                path: 'profile',
                                component: UserProfileComponent,
                                data: { breadcrumb: 'Perfil', breadcrumbData: '' },
                            },
                            {
                                path: 'topics',
                                component: UserTopicsComponent,
                                data: { breadcrumb: 'Topicos', breadcrumbData: '' },
                            },
                            {
                                path: 'comments',
                                component: UserCommentsComponent,
                                data: { breadcrumb: 'Comentarios', breadcrumbData: '' },
                            },
                            {
                                path: 'favorites',
                                component: UserFavoritesComponent,
                                data: { breadcrumb: 'Favoritos', breadcrumbData: '' },
                            }
                        ],
                    },
                    {
                        path: 'forum',
                        component: ForumComponent,
                        data: { breadcrumb: 'Forum' },
                    },
                    {
                        path: 'forum/:forumTag',
                        component: ForumTopicsComponent,
                        data: { breadcrumb: 'Forum Topics' }
                    },
                    {
                        path: 'forum/topico-tag/:tag',
                        component: TopicsTagComponent,
                        data: { breadcrumb: 'Tag', hero: false }
                    },
                    {
                        path: 'forum/:forumTag/:topicTag',
                        component: ForumTopicComponent,
                        pathMatch: 'full',
                        data: { breadcrumb: 'Topic', breadcrumbData: '' }
                    },
                ],
                canActivate: [AuthGuard],
                data: { action: "canViewForums" }
            },

            // { path: '**', component: PageNotFoundComponent }
        ]),
        provideHttpClient(),
        provideAnimations(), // required animations providers
        provideToastr(), // Toastr providers
    ]
};
