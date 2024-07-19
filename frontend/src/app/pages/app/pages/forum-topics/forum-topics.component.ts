import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';
import { InfoByForumComponent } from "./components/info-by-forum/info-by-forum.component";

export interface TopicByForumCard {
    mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png";
    tag: string;
    title: string;
    description: string;
    postDate: string;
    authorImageUrl: string;
    authorName: string;
}

@Component({
    selector: 'app-forum-topics',
    standalone: true,
    imports: [CommonModule, ListTopicsComponent, InfoByForumComponent],
    templateUrl: './forum-topics.component.html',
})
export class ForumTopicsComponent {
    posts = signal<TopicByForumCard[]>([
        {
            mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png",
            tag: 'freelancing',
            title: 'The Road to Freedom',
            description:
                'Freelancing can be a great way to experience true freedom in your life. You can work anywhere, everywhere...',
            authorImageUrl: 'https://source.unsplash.com/7YVZYZeITc8/30x30',
            authorName: 'John Smith',
            postDate: '10th August 2020',
        },
        {
            mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png",
            tag: 'freelancing',
            title: 'The Road to Freedom',
            description:
                'Freelancing can be a great way to experience true freedom in your life. You can work anywhere, everywhere...',
            authorImageUrl: 'https://source.unsplash.com/7YVZYZeITc8/30x30',
            authorName: 'John Smith',
            postDate: '10th August 2020',
        },
        {
            mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png",
            tag: 'freelancing',
            title: 'The Road to Freedom',
            description:
                'Freelancing can be a great way to experience true freedom in your life. You can work anywhere, everywhere...',
            authorImageUrl: 'https://source.unsplash.com/7YVZYZeITc8/30x30',
            authorName: 'John Smith',
            postDate: '10th August 2020',
        },
        {
            mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png",
            tag: 'freelancing',
            title: 'The Road to Freedom',
            description:
                'Freelancing can be a great way to experience true freedom in your life. You can work anywhere, everywhere...',
            authorImageUrl: 'https://source.unsplash.com/7YVZYZeITc8/30x30',
            authorName: 'John Smith',
            postDate: '10th August 2020',
        },
        {
            mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png",
            tag: 'freelancing',
            title: 'The Road to Freedom',
            description:
                'Freelancing can be a great way to experience true freedom in your life. You can work anywhere, everywhere...',
            authorImageUrl: 'https://source.unsplash.com/7YVZYZeITc8/30x30',
            authorName: 'John Smith',
            postDate: '10th August 2020',
        },
        {
            mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png",
            tag: 'freelancing',
            title: 'The Road to Freedom',
            description:
                'Freelancing can be a great way to experience true freedom in your life. You can work anywhere, everywhere...',
            authorImageUrl: 'https://source.unsplash.com/7YVZYZeITc8/30x30',
            authorName: 'John Smith',
            postDate: '10th August 2020',
        },
        {
            mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png",
            tag: 'freelancing',
            title: 'The Road to Freedom',
            description:
                'Freelancing can be a great way to experience true freedom in your life. You can work anywhere, everywhere...',
            authorImageUrl: 'https://source.unsplash.com/7YVZYZeITc8/30x30',
            authorName: 'John Smith',
            postDate: '10th August 2020',
        },
        {
            mainImageUrl: "https://wordpress-theme.spider-themes.net/docly/wp-content/uploads/2020/07/com_1.png",
            tag: 'freelancing',
            title: 'The Road to Freedom',
            description:
                'Freelancing can be a great way to experience true freedom in your life. You can work anywhere, everywhere...',
            authorImageUrl: 'https://source.unsplash.com/7YVZYZeITc8/30x30',
            authorName: 'John Smith',
            postDate: '10th August 2020',
        },
    ]);

    forumTag: string = "";

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Recupera o parâmetro da rota
        this.forumTag = this.route.snapshot.paramMap.get('forumTag') ?? "";

        // Se você precisar observar mudanças no parâmetro (por exemplo, se a rota puder mudar dentro do mesmo componente), use:
        this.route.paramMap.subscribe(params => {
            this.forumTag = params.get('forumTag') ?? "";
            // Faça algo com o novo valor de forumTag
        });
    }
}
