import { DatePipe } from '@angular/common';
import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { marked } from 'marked';
import { map } from 'rxjs';
import articlesData from '../../../../artigos/articles.json';
import profileData from '../../../../artigos/profile.json';
import { BlogLayout } from '../../layout/blog-layout/blog-layout';
import { ScrollTitleDirective } from '../../directives/scroll-title.directive';

interface Author {
  name: string;
  avatar: string;
}

interface ArticlePost {
  author: Author;
  title: string;
  slug: string;
  picture?: string;
  thumbnail?: string;
  tags?: { slug: string; name: string }[];
  subtitle?: string;
  description: string;
  body?: string;
  date: Date;
}

interface RecommendedArticle {
  image?: string;
  title: string;
  slug: string;
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [BlogLayout, DatePipe, RouterLink, ScrollTitleDirective],
  templateUrl: './post.html',
  styleUrl: './post.css',
  encapsulation: ViewEncapsulation.None,
})
export class Post {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly articles: ArticlePost[] = articlesData.map(article => ({
    ...article,
    author: {
      name: profileData.fullName,
      avatar: profileData.avatar
    },
    date: new Date(article.date),
  }));

  readonly slug = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly post = computed(() => this.articles.find(article => article.slug === this.slug()));

  readonly markdownBody = computed(() => this.post()?.body ?? this.post()?.description ?? '');

  readonly postBodyHtml = computed(() => marked.parse(this.markdownBody()) as string);

  readonly recommended = computed<RecommendedArticle[]>(() =>
    this.articles
      .filter(article => article.slug !== this.slug())
      .slice(0, 5)
      .map(article => ({
        image: article.thumbnail ?? article.picture,
        title: article.title,
        slug: article.slug,
      })),
  );
}
