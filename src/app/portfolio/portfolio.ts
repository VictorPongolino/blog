import { Component } from '@angular/core';
import { Footer } from '../shared/portfolio/footer/footer';
import { Aside } from '../shared/portfolio/aside/aside';
import { Article } from '../shared/portfolio/article/article';
import { ArticleOutline } from '../shared/portfolio/article/article';
import { Navbar } from '../shared/portfolio/navbar/navbar';
import articlesData from '../../artigos/articles.json';

interface ArticleContent extends ArticleOutline {
  thumbnail?: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [Footer, Aside, Navbar, Article],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  readonly articles: ArticleContent[] = articlesData.map(article => ({
    ...article,
    date: new Date(article.date),
  }));

  readonly recommended: RecommendedArticle[] = this.articles.slice(0, 5).map(article => ({
    image: article.thumbnail ?? article.picture,
    title: article.title,
    slug: article.slug,
  }));
}

export interface RecommendedArticle {
  image?: string;
  title: string;
  slug: string;
}
