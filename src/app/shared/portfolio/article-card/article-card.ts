import { Component, input, output } from '@angular/core';

export const ARTICLE_CARD_LAYOUT = {
  TOP: 'top',
  LEFT: 'left',
} as const;

export type ArticleCardLayout = typeof ARTICLE_CARD_LAYOUT[keyof typeof ARTICLE_CARD_LAYOUT];

@Component({
  selector: 'app-article-card',
  imports: [],
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
})
export class ArticleCard {
  readonly ARTICLE_CARD_LAYOUT = ARTICLE_CARD_LAYOUT;

  readonly title = input.required<string>();
  readonly titleFontSize = input('clamp(1.15rem, 1.8vw, 1.45rem)');
  readonly slug = input.required<string>();
  readonly description = input('');
  readonly descriptionFontSize = input('clamp(0.82rem, 1.1vw, 0.95rem)');
  readonly showDescription = input(true);
  readonly image = input('');
  readonly cardWidth = input<number | null>(null);
  readonly cardHeight = input<number | null>(null);
  readonly maxImageWidth = input(150);
  readonly maxImageHeight = input(150);
  readonly imageLayout = input<ArticleCardLayout>(ARTICLE_CARD_LAYOUT.TOP);

  readonly open = output<string>();

  onOpen(): void {
    this.open.emit(this.slug());
  }
}
