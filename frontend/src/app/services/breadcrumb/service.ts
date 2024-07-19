import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
    label: string;
    url: string;
    data?: string;
}

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
    breadcrumbs$ = this.breadcrumbs.asObservable();

    constructor(private router: Router) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            const root: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
            const breadcrumbs: Breadcrumb[] = this.createBreadcrumbs(root);
            this.breadcrumbs.next(breadcrumbs);
        });
    }

    private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const children: ActivatedRouteSnapshot[] = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            const routeURL: string = child.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            const breadcrumb: Breadcrumb = {
                label: child.data['breadcrumb'] || 'Home',
                url: url,
                data: child.data['breadcrumbData']
            };
            breadcrumbs.push(breadcrumb);

            return this.createBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }
}
