import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  languageHref(locale: 'en' | 'pt'): string {
    const baseHref = this.getBaseHref();
    const currentHash = this.getCurrentHash();

    if (locale === 'pt') {
      return `${baseHref}pt/${currentHash}`;
    }

    return `${baseHref}${currentHash}`;
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

  private getBaseHref(): string {
    if (typeof document === 'undefined') {
      return '/';
    }

    const baseHref = document.querySelector('base')?.getAttribute('href') ?? '/';
    return baseHref.endsWith('/') ? baseHref : `${baseHref}/`;
  }

  private getCurrentHash(): string {
    if (typeof window === 'undefined') {
      return '#/';
    }

    return window.location.hash || '#/';
  }
}
