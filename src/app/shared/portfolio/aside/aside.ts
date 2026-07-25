import { Component, Input, output, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleMetadataService } from '../../services/article-metadata.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside implements OnInit, OnDestroy {
  private readonly articleMetadataService = inject(ArticleMetadataService);
  private readonly route = inject(ActivatedRoute, { optional: true });

  @Input() recommended: RecommendedArticle[] = [];
  readonly profile: Profile = this.articleMetadataService.getProfile();
  readonly searchSubmitted = output<string>();
  
  navbarFixed = false;
  private navbarElement: HTMLElement | null = null;
  private observer: ResizeObserver | null = null;

  get displayedRecommended(): RecommendedArticle[] {
    if (this.recommended.length > 0) {
      return this.recommended;
    }

    const currentSlug = (this.route?.snapshot?.paramMap.get('slug') ?? '').trim().toLowerCase();

    return this.articleMetadataService
      .getArticles()
      .filter((article) => article.slug.toLowerCase() !== currentSlug)
      .map((article) => ({
        image: article.thumbnail ?? article.picture ?? '',
        title: article.title,
        slug: article.slug,
      }))
      .filter((article) => article.image.length > 0)
      .slice(0, 5);
  }

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.navbarElement = document.querySelector('app-navbar section');
    if (this.navbarElement) {
      this.observer = new ResizeObserver(() => this.checkNavbarPosition());
      this.observer.observe(this.navbarElement);
      this.checkNavbarPosition();
      window.addEventListener('scroll', () => this.checkNavbarPosition());
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('scroll', () => this.checkNavbarPosition());
  }

  private checkNavbarPosition(): void {
    if (this.navbarElement) {
      const isFixed = getComputedStyle(this.navbarElement).position === 'fixed';
      if (this.navbarFixed !== isFixed) {
        this.navbarFixed = isFixed;
        this.cdr.markForCheck();
      }
    }
  }

  onSearchContent(value: string): void {   
    this.searchSubmitted.emit(value.trim());
  }

  onStopSearch(): void {
    this.searchSubmitted.emit('');
  }
}
interface RecommendedArticle { 
  image: string;
  title: string;
  slug: string;
}

interface Profile {
  avatar: string;
  fullName: string;
  title: string;
  socialLinks: {
    linkedin: string;
    github: string;
    youtube: string;
  };
}
