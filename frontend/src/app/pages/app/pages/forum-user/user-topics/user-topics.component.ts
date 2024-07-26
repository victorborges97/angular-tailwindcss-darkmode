import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUserComponent } from "../../../components/image-user/image-user.component";
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { strings as englishStrings } from "ngx-timeago/language-strings/pt-br";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { GetUserModel } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/user/model.service';
import { TopicsService } from 'src/app/services/topics/model.service';
@Component({
    selector: 'app-user-topics',
    standalone: true,
    imports: [CommonModule, ImageUserComponent, TimeagoModule, RouterOutlet, RouterLink],
    providers: [
        { provide: TimeagoClock, useClass: TimeagoDefaultClock },
        { provide: TimeagoIntl, useClass: TimeagoIntl },
        { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    ],
    templateUrl: './user-topics.component.html',
})
export class UserTopicsComponent {

    constructor(
        intl: TimeagoIntl,
        private usersService: UsersService,
        private topicsService: TopicsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        intl.strings = englishStrings;
        intl.changes.next();
    }

    idUser = "";
    loading = signal(false);
    user = signal<GetUserModel | null>(null);

    ngOnInit() {

        // Se você precisar observar mudanças no parâmetro (por exemplo, se a rota puder mudar dentro do mesmo componente), use:
        this.loading.set(true);

        this.route.parent?.params.subscribe(params => {
            this.idUser = params['id'];
            this.fetchUser();
        });
    }

    fetchUser() {
        this.loading.set(true);
        this.usersService.getUserById(this.idUser).then((data) => {
            this.user.set(data);
            this.loading.set(false);
        })
            .catch(e => {
                this.loading.set(false);
                alert(`Data: ${JSON.stringify(e.error)}`)
            })
    }

}
