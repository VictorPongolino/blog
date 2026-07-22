import { Directive, ElementRef, output, inject, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ApplicationRef } from '@angular/core';
import { ScrollTitleService } from '../services/scroll-title.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appScrollTitle]',
  standalone: true,
})
export class ScrollTitleDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollTitleService = inject(ScrollTitleService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly appRef = inject(ApplicationRef);
  readonly scrollTitle = output<{ title: string | null; isScrolled: boolean }>();

  private titleElement: Element | null = null;
  private observer: IntersectionObserver | null = null;
  private destroy$ = new Subject<void>();

  constructor() {
    console.log('[ScrollTitleDirective] Constructor called');
  }

  ngAfterViewInit(): void {
    console.log('[ScrollTitleDirective] ngAfterViewInit called');
    this.waitForPageLoad();
  }

  private waitForPageLoad(): void {
    if (typeof window === 'undefined') {
      console.log('[ScrollTitleDirective] Window is undefined, skipping');
      return;
    }

    console.log('[ScrollTitleDirective] Waiting for Angular to stabilize...');

    // Use Angular's isStable to detect when the page is fully rendered
    const stableSubscription = this.appRef.isStable
      .pipe(takeUntil(this.destroy$))
      .subscribe((isStable) => {
        if (isStable) {
          console.log('[ScrollTitleDirective] Angular is stable, initializing observer');
          this.initializeObserver();
        }
      });
  }

  private initializeObserver(): void {
    console.log('[ScrollTitleDirective] initializeObserver called');
    
    if (typeof window === 'undefined' || !this.elementRef.nativeElement) {
      console.log('[ScrollTitleDirective] Window undefined or no element ref');
      return;
    }

    // Find the h1 - should exist since Angular is stable
    const titleElement = this.elementRef.nativeElement.querySelector('h1');
    
    console.log('[ScrollTitleDirective] Found h1:', titleElement?.textContent?.trim());

    if (!titleElement || !titleElement.textContent?.trim()) {
      console.log('[ScrollTitleDirective] Failed to locate non-empty title element');
      return;
    }

    this.titleElement = titleElement;
    console.log('[ScrollTitleDirective] Title element confirmed:', titleElement.textContent?.trim());

    // Use scroll listener instead of Intersection Observer for more reliable detection
    if (typeof window !== 'undefined') {
      const scrollListener = () => {
        if (!this.titleElement) return;
        
        const rect = this.titleElement.getBoundingClientRect();
        const isOut = rect.top < 0; // Title has scrolled above the viewport
        const title = this.titleElement.textContent?.trim() || null;

        const payload = {
          title: isOut ? title : null,
          isScrolled: isOut,
        };

        console.log('[ScrollTitleDirective] Scroll detected:', {
          titleTop: rect.top,
          isScrolled: isOut,
          title: title,
        });

        this.scrollTitle.emit(payload);
        this.scrollTitleService.setScrollTitle(payload.title, payload.isScrolled);
      };

      window.addEventListener('scroll', scrollListener, { passive: true });
      // Initial check
      scrollListener();
    }
  }

  private cleanupObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.titleElement = null;
  }

  ngOnDestroy(): void {
    console.log('[ScrollTitleDirective] Destroying');
    this.cleanupObserver();
    this.scrollTitleService.clearScrollTitle();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
