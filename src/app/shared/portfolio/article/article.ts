import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  
  readonly maxItemsPerPage = signal(3);
  readonly articles = input.required<ArticleOutline[]>();

  readonly currentPage = toSignal(this.route.queryParamMap.pipe(map(params => Number(params.get('page') || 1))), { initialValue: 1 });
  
  readonly visibleArticles = computed(() => {
    const start = (this.currentPage() - 1) * this.maxItemsPerPage();
    const end = start + this.maxItemsPerPage();
    return this.articles().slice(start, end);
  });

  readonly showPagination: Signal<boolean> = computed(() => this.articles().length > this.maxItemsPerPage());
  readonly pages = computed(() => Array.from({ length: Math.ceil(this.articles().length / this.maxItemsPerPage()) }, (_, i) => i + 1));

}

export interface ArticleOutline {
  author: Author;
  title: string;
  slug: string;
  picture?: string;
  tags?: string[];
  description: string;
  date: Date;
}

export interface Author {
  name: string;
  avatar: string;
}