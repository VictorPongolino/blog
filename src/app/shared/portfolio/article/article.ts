import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ArticleSearch, FilterState } from '../article-search/article-search';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [DatePipe, RouterLink, ArticleSearch],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  
  readonly maxItemsPerPage = signal(3);
  readonly articles = input.required<ArticleOutline[]>();
  readonly showSearchControl = input(false);
  readonly searchQuery = input('');

  readonly currentPage = toSignal(this.route.queryParamMap.pipe(map(params => Number(params.get('page') || 1))), { initialValue: 1 });
  readonly filter = signal<FilterState>({ order: 'Mais Recentes', tempo: 'Sempre', categoria: 'Todas' });
  readonly categories = computed(() => {
    const uniqueCategories = new Set<string>();
    uniqueCategories.add('Todas');
    this.articles().forEach(article => {
      article.tags?.forEach(tag => uniqueCategories.add(tag.name));
    });
    return Array.from(uniqueCategories);
  });

  readonly hasSearchQuery = computed(() => this.searchQuery().trim().length > 0);

  onFilterChange(f: FilterState): void {
    this.filter.set(f);
  }

  readonly filteredArticles = computed(() => {
    const { order, tempo, categoria } = this.filter();
    const term = this.searchQuery().trim().toLowerCase();
    const now = new Date();

    const scored = this.articles()
      .map(a => {
        const text = `${a.author.name} ${a.title} ${a.description} ${a.body ?? ''}`.toLowerCase();
        const matches = term ? (text.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))?.length ?? 0) : 0;
        return { article: a, matches };
      })
      .filter(({ article: a }) => {
        if (categoria !== 'Todas' && !a.tags?.some(tag => tag.name.toLowerCase() === categoria.toLowerCase())) {
          return false;
        }
        return true;
      })
      .filter(({ article: a, matches }) => {
        if (term && matches === 0) return false;
        const date = new Date(a.date);
        switch (tempo) {
          case 'Hoje': return date.toDateString() === now.toDateString();
          case 'Uma semana atrás': return (now.getTime() - date.getTime()) <= 7 * 24 * 60 * 60 * 1000;
          case 'Um mês atrás': return (now.getTime() - date.getTime()) <= 30 * 24 * 60 * 60 * 1000;
          case 'Um ano atrás': return (now.getTime() - date.getTime()) <= 365 * 24 * 60 * 60 * 1000;
          default: return true;
        }
      })
      .sort((a, b) => {
        if (term && a.matches !== b.matches) return b.matches - a.matches;
        const diff = new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
        return order === 'Mais Antigos' ? -diff : diff;
      });

    return scored.map(s => s.article);
  });

  readonly sourceArticles = computed(() => {
    const filtered = this.filteredArticles();

    if (this.hasSearchQuery() && filtered.length === 0) {
      return this.articles();
    }

    return filtered;
  });

  readonly visibleArticles = computed(() => {
    const start = (this.currentPage() - 1) * this.maxItemsPerPage();
    const end = start + this.maxItemsPerPage();
    return this.sourceArticles().slice(start, end);
  });

  readonly showPagination: Signal<boolean> = computed(() => this.sourceArticles().length > this.maxItemsPerPage());
  readonly pages = computed(() => Array.from({ length: Math.ceil(this.sourceArticles().length / this.maxItemsPerPage()) }, (_, i) => i + 1));

}

export interface ArticleOutline {
  author: Author;
  title: string;
  slug: string;
  picture?: string;
  tags?: Tags[];
  description: string;
  body?: string;
  date: Date;
}

export interface Tags {
  slug: string;
  name: string;
}

export interface Author {
  name: string;
  avatar: string;
}