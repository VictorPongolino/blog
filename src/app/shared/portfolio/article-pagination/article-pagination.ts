import { Component, computed, input, output, effect } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-pagination',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-pagination.html',
  styleUrl: './article-pagination.css',
})
export class ArticlePagination {
  readonly pages = input.required<number[]>();
  readonly currentPage = input.required<number>();
  readonly pageClick = output<number>();

  readonly firstPage = computed(() => this.pages().at(0));
  readonly lastPage = computed(() => this.pages().at(-1));
  readonly visiblePages = computed(() => this.pages().slice(0, 5));
  readonly showEllipsis = computed(() => this.pages().length > 5);
  readonly hasLastPage = computed(() => this.pages().length > 4);
  
  readonly showFirstPage = computed(() => 
    this.firstPage() !== undefined && !this.visiblePages().includes(this.firstPage()!)
  );
  readonly showLastPage = computed(() => 
    this.lastPage() !== undefined && !this.visiblePages().includes(this.lastPage()!)
  );
  readonly hasPrevButton = computed(() => this.currentPage() > 1);
  readonly hasNextButton = computed(() => this.currentPage() < (this.lastPage() ?? 1)); 

  onPageClick(page: number): void {
    const validPage = Math.max(1, Math.min(page, this.lastPage() ?? 1));
    
    if (typeof window === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    this.pageClick.emit(validPage);
  }
}
