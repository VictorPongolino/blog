import { Component, computed, signal } from '@angular/core';
import articlesData from '../../artigos/articles.json';
import { Article } from '../shared/portfolio/article/article';
import { ArticleOutline } from '../shared/portfolio/article/article';
import { BlogLayout } from '../shared/layout/blog-layout/blog-layout';

interface ArticleContent extends ArticleOutline {
  thumbnail?: string;
}

interface RecommendedArticle {
  image?: string;
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
  imports: [BlogLayout, Article],
  templateUrl: './article-layout.html',
  styleUrl: './article-layout.css',
})
export class ArticleLayout {
  readonly articles: ArticleContent[] = articlesData.map(article => ({
    ...article,
    date: new Date(article.date),
  }));

  readonly recommended: RecommendedArticle[] = this.articles.slice(0, 5).map(article => ({
    image: article.thumbnail ?? article.picture,
    title: article.title,
    slug: article.slug,
  }));

  readonly searchedContent = signal<SearchedContent>({});
  readonly showSearchControl = signal(false);

  onUserSearchedContent(value: string): void {
    this.showSearchControl.set(true);
    this.searchedContent.update((current) => ({ ...current, content: value }));
  }
}
