import { Component, Input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import profileData from '../../../../artigos/profile.json';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  @Input() recommended: RecommendedArticle[] = [];
  readonly profile: Profile = profileData;
  readonly searchSubmitted = output<string>();

  onSearchContent(value: string): void {
    if (value.trim().length === 0) {
      return;
    }
    
    this.searchSubmitted.emit(value.trim());
  }
}
interface RecommendedArticle { 
  image?: string;
  title: string;
  slug: string;
}

interface Profile {
  avatar: string;
  fullName: string;
  title: string;
  socialLinks: {
    linkedin: string;
    github: string;
    youtube: string;
  };
}
