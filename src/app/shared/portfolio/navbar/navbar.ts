import { Component, signal, inject, effect, computed, HostListener } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { ScrollTitleService } from '../../services/scroll-title.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuOpen = signal(false);
  readonly currentLocale = signal<'en' | 'pt'>(this.detectCurrentLocale());
  readonly scrollTitleService = inject(ScrollTitleService);
  readonly isDetailPage = signal(false);
  readonly scrollPosition = signal(0);
  
  // Threshold (px) after which navbar should stop being fixed on detail pages
  // This allows the intro section (author info, image) to be read without navbar overlap
  private readonly INTRO_SECTION_THRESHOLD = 350;
  
  readonly shouldFixNavbar = computed(
    () => this.isDetailPage() && this.scrollPosition() < this.INTRO_SECTION_THRESHOLD
  );
  
  private router = inject(Router);

  constructor() {
    // Track scroll service changes for debugging
    effect(() => {
      const title = this.scrollTitleService.currentScrollTitle();
      const isScrolled = this.scrollTitleService.isScrolled();
      console.log('[Navbar] Scroll service updated:', { title, isScrolled });
    });

    // Detect if we're on an article detail page
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Check if URL matches /blog/:slug pattern (detail page)
        // Detail pages: /blog/teste, /blog/teste1, etc.
        // List page: /blog
        const urlPath = event.urlAfterRedirects || event.url;
        const isDetail = /\/blog\/[^/]+$/.test(urlPath);
        this.isDetailPage.set(isDetail);
        // Reset scroll position when navigating to a new page
        this.scrollPosition.set(0);
      });

    // Initial check on component init
    const currentUrl = this.router.url;
    const isDetail = /\/blog\/[^/]+$/.test(currentUrl);
    this.isDetailPage.set(isDetail);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrollPosition.set(window.scrollY);
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  languageHref(locale: 'en' | 'pt'): string {
    const appRoot = this.getAppRoot();
    const currentHash = this.getCurrentHash();

    if (locale === 'pt') {
      return `${appRoot}pt/${currentHash}`;
    }

    return `${appRoot}${currentHash}`;
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private detectCurrentLocale(): 'en' | 'pt' {
    if (typeof window === 'undefined') {
      return 'en';
    }

    return window.location.pathname.includes('/pt/') ? 'pt' : 'en';
  }

  private getAppRoot(): string {
    if (typeof document === 'undefined') {
      return '/';
    }

    const baseHref = document.querySelector('base')?.getAttribute('href') ?? '/';
    const normalizedBaseHref = baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
    return normalizedBaseHref.replace(/(en|pt)\/$/, '');
  }

  private getCurrentHash(): string {
    if (typeof window === 'undefined') {
      return '#/';
    }

    return window.location.hash || '#/';
  }
}
