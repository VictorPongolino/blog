import { Component, ElementRef, HostListener, effect, input, output, signal } from '@angular/core';

export interface FilterState {
    order: string;
    tempo: string;
    categoria: string;
}

@Component({
  selector: 'app-article-search',
  standalone: true,
  imports: [],
  templateUrl: './article-search.html',
  styleUrl: './article-search.css',
})
export class ArticleSearch {
    openDropdown: string | null = null;
    filterChange = output<FilterState>();
    showAdvancedSearchBar = input<boolean>(false);
    categories = input<string[]>([]);
    activeFilter = input<FilterState | null>(null);
    readonly orderOptions = [
        $localize`:@@article-search-order-recent:Mais Recentes`,
        $localize`:@@article-search-order-oldest:Mais Antigos`,
    ];
    readonly timeOptions = [
        $localize`:@@article-search-time-today:Hoje`,
        $localize`:@@article-search-time-week:Uma semana atrás`,
        $localize`:@@article-search-time-month:Um mês atrás`,
        $localize`:@@article-search-time-year:Um ano atrás`,
        $localize`:@@article-search-time-all:Sempre`,
    ];
    readonly allCategoriesLabel = $localize`:@@article-search-category-all:Todas`;
    selected: Record<string, string> = {
        relevancia: this.orderOptions[0],
        tempo: this.timeOptions[this.timeOptions.length - 1],
        categoria: this.allCategoriesLabel,
    };

    constructor(private elRef: ElementRef) {
        effect(() => {
            const filter = this.activeFilter();

            if (!filter) {
                return;
            }

            this.selected = {
                ...this.selected,
                relevancia: filter.order,
                tempo: filter.tempo,
                categoria: filter.categoria,
            };
        });
    }

    toggleDropdown(name: string): void {
        this.openDropdown = this.openDropdown === name ? null : name;
    }

    selectItem(dropdown: string, item: string): void {
        this.selected[dropdown] = item;
        this.openDropdown = null;
        this.filterChange.emit({ order: this.selected['relevancia'], tempo: this.selected['tempo'], categoria: this.selected['categoria'] });
    }

    @HostListener('document:click', ['$event.target'])
    onClickOutside(target: EventTarget | null): void {
        if (!this.elRef.nativeElement.contains(target)) {
            this.openDropdown = null;
        }
    }
}
