import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-pagination',
  standalone: true,
  imports: [FormsModule],
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
  readonly minPage = computed(() => this.firstPage() ?? 1);
  readonly maxPage = computed(() => this.lastPage() ?? 1);

  selectedPage: number | null = null;

  hasSelectedPage(): boolean {
    return this.selectedPage !== null && !Number.isNaN(this.selectedPage);
  }

  onPageBeforeInput(event: InputEvent): void {
    if (event.inputType.startsWith('delete')) {
      return;
    }

    const nextChunk = event.data ?? '';
    if (!/^\d+$/.test(nextChunk)) {
      event.preventDefault();
    }
  }

  onPagePaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') ?? '';
    if (!/^\d+$/.test(pastedText.trim())) {
      event.preventDefault();
    }
  }

  onPageInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;

    if (!inputElement) {
      return;
    }

    const rawValue = inputElement.value;

    if (rawValue === '') {
      this.selectedPage = null;
      return;
    }

    const parsedValue = Number(rawValue);

    if (Number.isNaN(parsedValue)) {
      this.selectedPage = null;
      inputElement.value = '';
      return;
    }

    const minPage = this.minPage();
    const maxPage = this.maxPage();
    const clampedValue = Math.max(minPage, Math.min(Math.trunc(parsedValue), maxPage));

    this.selectedPage = clampedValue;

    if (rawValue !== String(clampedValue)) {
      inputElement.value = String(clampedValue);
    }
  }

  onPageSubmit(): void {
    if (this.selectedPage === null || Number.isNaN(this.selectedPage)) {
      return;
    }

    const firstPage = this.firstPage() ?? 1;
    const lastPage = this.lastPage() ?? 1;

    if (this.selectedPage >= firstPage && this.selectedPage <= lastPage) {
      this.onPageClick(this.selectedPage);
      this.selectedPage = null;
    }
  }

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
