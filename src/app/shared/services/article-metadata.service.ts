import { Injectable } from '@angular/core';

import articlesData from '../../../../public/articles/metadata/articles.json';
import profileData from '../../../../public/articles/metadata/profile.json';

export interface ArticleMetadata {
  tags: { slug: string; name: string }[];
  subtitle?: string;
  picture?: string;
  thumbnail?: string;
  slug: string;
  title: string;
  description: string;
  date: string;
}

export interface ProfileMetadata {
  avatar: string;
  fullName: string;
  title: string;
  socialLinks: {
    linkedin: string;
    github: string;
    youtube: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ArticleMetadataService {
  private readonly articles: ArticleMetadata[] = articlesData;
  private readonly profile: ProfileMetadata = profileData;

  getArticles(): ArticleMetadata[] {
    return this.articles;
  }

  getProfile(): ProfileMetadata {
    return this.profile;
  }
}