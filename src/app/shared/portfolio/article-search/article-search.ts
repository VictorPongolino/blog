import { Component, ElementRef, HostListener, output } from '@angular/core';

export interface FilterState {
    order: string;
    tempo: string;
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

    selected: Record<string, string> = {
        relevancia: 'Mais Recentes',
        tempo: 'Sempre',
    };

    constructor(private elRef: ElementRef) {}

    toggleDropdown(name: string): void {
        this.openDropdown = this.openDropdown === name ? null : name;
    }

    selectItem(dropdown: string, item: string): void {
        this.selected[dropdown] = item;
        this.openDropdown = null;
        this.filterChange.emit({ order: this.selected['relevancia'], tempo: this.selected['tempo'] });
    }

    @HostListener('document:click', ['$event.target'])
    onClickOutside(target: EventTarget | null): void {
        if (!this.elRef.nativeElement.contains(target)) {
            this.openDropdown = null;
        }
    }
}
