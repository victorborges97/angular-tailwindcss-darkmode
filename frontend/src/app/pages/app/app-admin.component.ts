import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-app-admin',
    standalone: true,
    imports: [CommonModule, HeaderComponent, HeroComponent, BreadcrumbComponent, RouterOutlet, FooterComponent],
    templateUrl: './app-admin.component.html',
})
export class AppAdminComponent {

    isHero: boolean = false;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.children.map(async (c) => {
            console.log(c)
            var value = await firstValueFrom(c.data);
            this.isHero = value['hero'] ?? true;
            console.log('Is Hero:', this.isHero);
        })
    }

}
