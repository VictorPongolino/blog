import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewEncapsulation, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router, RouterLink, convertToParamMap } from '@angular/router';
import { marked } from 'marked';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { BlogLayout } from '../../layout/blog-layout/blog-layout';
import { ScrollTitleDirective } from '../../directives/scroll-title.directive';
import {
  ArticleBody,
  PostService,
  RecommendedArticle,
} from '../../services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [BlogLayout, DatePipe, RouterLink, ScrollTitleDirective],
  templateUrl: './post.html',
  styleUrl: './post.css',
  encapsulation: ViewEncapsulation.None,
})
export class Post {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly route = inject(ActivatedRoute, { optional: true });
  private readonly router: Router = inject(Router);
  private readonly postService = inject(PostService);
  private readonly fallbackParamMap$ = of(convertToParamMap({ slug: '' }));

  private get routeParamMap$(): Observable<ParamMap> {
    return this.route?.paramMap ?? this.fallbackParamMap$;
  }

  backToArticles(): void {
    window.scrollTo({ top: 0 });
    this.router.navigate(['/blog']);
  }

  onPostContentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest('a');

    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute('href') ?? '';
    if (!href.startsWith('#')) {
      return;
    }

    event.preventDefault();

    const fragment = decodeURIComponent(href.slice(1));
    if (!fragment) {
      return;
    }

    const root = this.elementRef.nativeElement;
    const directMatch = root.querySelector(`#${CSS.escape(fragment)}`) as HTMLElement | null;

    if (directMatch) {
      directMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const wanted = this.slugify(fragment);
    const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6')) as HTMLElement[];
    const byText = headings.find((heading) => this.slugify(heading.textContent ?? '') === wanted);

    byText?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private slugify(value: string): string {
    return value
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }

  readonly slug = toSignal(
    this.routeParamMap$.pipe(map(params => params.get('slug') ?? '')),
    { initialValue: this.route?.snapshot?.paramMap.get('slug') ?? '' },
  );

  readonly post = computed(() => this.postService.findBySlug(this.slug()));

  readonly body = toSignal(
    this.routeParamMap$.pipe(
      map((params) => params.get('slug') ?? ''),
      switchMap((slug) => {
        if (!slug) {
          return of('');
        }

        return this.postService
          .getBody(slug)
          .pipe(
            map((response) => response.content),
            catchError(() => of('')),
          );
      }),
    ),
    { initialValue: '' },
  );

  readonly markdownBody = computed(() => this.body() || this.post()?.description || '');

  readonly postBodyHtml = computed(() => marked.parse(this.markdownBody()) as string);

  readonly recommended = computed<RecommendedArticle[]>(() =>
    this.postService.getRecommended(this.slug()),
  );

  getBody(slug: string): Observable<ArticleBody> {
    return this.postService.getBody(slug);
  }
}
