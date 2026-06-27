import { Component } from '@angular/core';
import { ArticleLayout } from '../article-layout/article-layout';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ArticleLayout],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {}
