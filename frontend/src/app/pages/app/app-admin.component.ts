import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-app-admin',
    standalone: true,
    imports: [CommonModule, HeaderComponent, HeroComponent, BreadcrumbComponent, RouterOutlet, FooterComponent],
    templateUrl: './app-admin.component.html',
})
export class AppAdminComponent {

}
