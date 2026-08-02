import { ChangeDetectionStrategy, Component, ElementRef, computed, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-content-search',
  imports: [],
  templateUrl: './content-search.html',
  styleUrl: './content-search.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSearch {
  readonly showHeading = input(true);
  readonly collapsedByDefault = input(false);
  readonly searchSubmitted = output<string>();

  readonly query = signal('');
  readonly isExpanded = signal(false);
  readonly isCollapsible = computed(() => this.showHeading() || this.collapsedByDefault());

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  openSearch(): void {
    if (!this.isCollapsible()) {
      return;
    }

    this.isExpanded.set(true);
    queueMicrotask(() => this.searchInput()?.nativeElement.focus());
  }

  closeSearch(): void {
    if (!this.isCollapsible()) {
      return;
    }

    this.isExpanded.set(false);
  }

  onQueryInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.query.set(target?.value ?? '');
  }

  submitSearch(event?: Event): void {
    event?.preventDefault();
    this.searchSubmitted.emit(this.query().trim());
  }

  clearSearch(): void {
    this.query.set('');
    this.searchSubmitted.emit('');
  }
}