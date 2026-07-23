import { Component, Input, output, OnInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import profileData from '../../../../artigos/profile.json';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside implements OnInit, OnDestroy {
  @Input() recommended: RecommendedArticle[] = [];
  readonly profile: Profile = profileData;
  readonly searchSubmitted = output<string>();
  
  navbarFixed = false;
  private navbarElement: HTMLElement | null = null;
  private observer: ResizeObserver | null = null;

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
  image?: string;
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
