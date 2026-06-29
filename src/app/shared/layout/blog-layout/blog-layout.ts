import { Component, input, output } from '@angular/core';
import { Aside } from '../../portfolio/aside/aside';
import { Footer } from '../../portfolio/footer/footer';
import { Navbar } from '../../portfolio/navbar/navbar';

interface RecommendedArticle {
  image?: string;
  title: string;
  slug: string;
}

@Component({
  selector: 'app-blog-layout',
  standalone: true,
  imports: [Navbar, Aside, Footer],
  templateUrl: './blog-layout.html',
  styleUrl: './blog-layout.css',
})
export class BlogLayout {
  readonly recommended = input<RecommendedArticle[]>([]);
  readonly hideAsideOnMobile = input(false);
  readonly addDesktopMainGap = input(false);
  readonly searchSubmitted = output<string>();
}
