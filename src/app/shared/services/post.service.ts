import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ArticleMetadataService } from './article-metadata.service';

export interface ArticleBody {
  content: string;
}

interface Author {
  name: string;
  avatar: string;
}

export interface ArticlePost {
  author: Author;
  title: string;
  slug: string;
  picture?: string;
  thumbnail?: string;
  tags?: { slug: string; name: string }[];
  subtitle?: string;
  description: string;
  body?: string;
  date: Date;
}

export interface RecommendedArticle {
  image: string;
  title: string;
  slug: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly articleMetadataService = inject(ArticleMetadataService);

  private readonly articles: ArticlePost[] = this.articleMetadataService.getArticles().map((article) => ({
    ...article,
    author: {
      name: this.articleMetadataService.getProfile().fullName,
      avatar: this.articleMetadataService.getProfile().avatar,
    },
    date: new Date(article.date),
  }));

  private normalizeSlug(slug: string): string {
    return decodeURIComponent(slug).trim().toLowerCase();
  }

  getArticles(): ArticlePost[] {
    return this.articles;
  }

  findBySlug(slug: string): ArticlePost | undefined {
    const normalizedSlug = this.normalizeSlug(slug);
    return this.articles.find((article) => this.normalizeSlug(article.slug) === normalizedSlug);
  }

  getRecommended(excludedSlug: string, limit = 5): RecommendedArticle[] {
    const normalizedExcludedSlug = this.normalizeSlug(excludedSlug);
    const filtered = this.articles
      .filter((article) => this.normalizeSlug(article.slug) !== normalizedExcludedSlug)
      .map((article) => ({
        image: article.thumbnail ?? article.picture ?? '',
        title: article.title,
        slug: article.slug,
      }))
      .filter((article) => article.image.length > 0)
      .slice(0, limit);

    if (filtered.length > 0) {
      return filtered;
    }

    return this.articles
      .map((article) => ({
        image: article.thumbnail ?? article.picture ?? '',
        title: article.title,
        slug: article.slug,
      }))
      .filter((article) => article.image.length > 0)
      .slice(0, limit);
  }

  getBody(slug: string): Observable<ArticleBody> {
    return this.http
      .get(`articles/posts/${slug}.md`, { responseType: 'text' })
      .pipe(map((body: string) => ({ content: body })));
  }
}