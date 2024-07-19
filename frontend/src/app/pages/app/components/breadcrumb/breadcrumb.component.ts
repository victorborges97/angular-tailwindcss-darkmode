import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'src/app/services/breadcrumb/service';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
    breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

    constructor(private breadcrumbService: BreadcrumbService) { }

    ngOnInit(): void { }
}
