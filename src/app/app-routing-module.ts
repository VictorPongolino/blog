import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadComponent: () => import('./article-layout/article-layout').then(m => m.ArticleLayout)},
  {path: ':slug', loadComponent: () => import('./shared/portfolio/post/post').then(m => m.Post)},
  // Backward-compatible redirects from previous hash/prefixed routes.
  {path: 'blog', redirectTo: '', pathMatch: 'full'},
  {path: 'blog/:slug', redirectTo: '/:slug', pathMatch: 'full'},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
