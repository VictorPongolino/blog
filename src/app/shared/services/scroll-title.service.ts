import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollTitleService {
  readonly currentScrollTitle = signal<string | null>(null);
  readonly isScrolled = signal(false);

  setScrollTitle(title: string | null, isScrolled: boolean): void {
    this.currentScrollTitle.set(title);
    this.isScrolled.set(isScrolled);
  }

  clearScrollTitle(): void {
    this.currentScrollTitle.set(null);
    this.isScrolled.set(false);
  }
}
