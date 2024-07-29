import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUserComponent } from "../../components/image-user/image-user.component";
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { strings as englishStrings } from "ngx-timeago/language-strings/pt-br";
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserForum } from 'src/app/interfaces/forum';
import { GetUserModel } from 'src/app/interfaces/user.model';
import { UsersService } from 'src/app/services/user/model.service';
import { GetUserModelSharedService } from 'src/app/services/user/user.shared.service';

@Component({
    selector: 'app-forum-user',
    standalone: true,
    imports: [CommonModule, ImageUserComponent, TimeagoModule, RouterOutlet, RouterLink, RouterLinkActive],
    providers: [
        { provide: TimeagoClock, useClass: TimeagoDefaultClock },
        { provide: TimeagoIntl, useClass: TimeagoIntl },
        { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    ],
    templateUrl: './forum-user.component.html',
})
export class ForumUserComponent {

    constructor(
        intl: TimeagoIntl,
        private usersService: UsersService,
        private route: ActivatedRoute,
        public getUserShared: GetUserModelSharedService,
    ) {
        intl.strings = englishStrings;
        intl.changes.next();
    }

    loading = signal(false);
    idUser = "";

    ngOnInit() {
        // Se você precisar observar mudanças no parâmetro (por exemplo, se a rota puder mudar dentro do mesmo componente), use:
        this.loading.set(true);
        this.route.paramMap.subscribe(params => {
            this.idUser = params.get('id') ?? "";
            // Faça algo com o novo valor de topicTag
            this.fetchUser();
        });
    }

    fetchUser() {
        this.loading.set(true);
        this.usersService.getUserById(this.idUser).then((data) => {
            this.getUserShared.setUser(data)
            this.loading.set(false);
        }).catch(e => {
            this.loading.set(false);
            alert(`Data: ${JSON.stringify(e.error)}`)
        })
    }

}
