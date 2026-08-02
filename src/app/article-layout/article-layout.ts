import { Component, computed, inject, signal } from '@angular/core';
import { ArticleCatalog } from '../shared/portfolio/article/article';
import { ArticleOutline } from '../shared/portfolio/article/article';
import { BlogLayout } from '../shared/layout/blog-layout/blog-layout';
import { ArticleMetadataService } from '../shared/services/article-metadata.service';

interface ArticleContent extends ArticleOutline {
  thumbnail?: string;
}

interface RecommendedArticle {
  image: string;
  title: string;
  slug: string;
}

interface SearchedContent {
  content?: string;
  durationDays?: number;
  category?: string[];
}

@Component({
  selector: 'app-article-layout',
  standalone: true,
  imports: [BlogLayout, ArticleCatalog],
  templateUrl: './article-layout.html',
  styleUrl: './article-layout.css',
})
export class ArticleLayout {
  private readonly articleMetadataService = inject(ArticleMetadataService);
  private readonly profile = this.articleMetadataService.getProfile();

  readonly articles: ArticleContent[] = this.articleMetadataService.getArticles().map(article => ({
    ...article,
    author: {
      name: this.profile.fullName,
      avatar: this.profile.avatar,
    },
    date: new Date(article.date),
  }));

  readonly visibleArticleSlugs = signal<string[]>([]);

  readonly recommended = computed<RecommendedArticle[]>(() => {
    const visibleSlugSet = new Set(this.visibleArticleSlugs());

    const hiddenFromCurrentPage = this.articles
      .filter((article) => !visibleSlugSet.has(article.slug))
      .map((article) => ({
        image: article.thumbnail ?? article.picture ?? '',
        title: article.title,
        slug: article.slug,
      }))
      .filter((article) => article.image.length > 0)
      .slice(0, 5);

    if (hiddenFromCurrentPage.length > 0) {
      return hiddenFromCurrentPage;
    }

    return this.articles
      .map((article) => ({
        image: article.thumbnail ?? article.picture ?? '',
        title: article.title,
        slug: article.slug,
      }))
      .filter((article) => article.image.length > 0)
      .slice(0, 5);
  });

  readonly searchedContent = signal<SearchedContent>({});
  readonly showSearchControl = signal(false);

  onUserSearchedContent(value: string): void {
    if (value.trim().length === 0) {
      this.showSearchControl.set(false);
      return;
    }
    
    this.showSearchControl.set(true);
    this.searchedContent.update((current) => ({ ...current, content: value }));
  }

  onVisibleArticlesChange(slugs: string[]): void {
    this.visibleArticleSlugs.set(slugs);
  }
}
