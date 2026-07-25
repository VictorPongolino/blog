import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleMetadataService, ProfileMetadata } from '../../services/article-metadata.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly articleMetadataService = inject(ArticleMetadataService);

  readonly profile: ProfileMetadata = this.articleMetadataService.getProfile();
}
