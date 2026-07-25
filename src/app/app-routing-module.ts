import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'blog', pathMatch: 'full'},
  {path: 'blog', loadComponent: () => import('./article-layout/article-layout').then(m => m.ArticleLayout)},
  {path: 'blog/:slug', loadComponent: () => import('./shared/portfolio/post/post').then(m => m.Post)},
  {path: '**', redirectTo: 'blog'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
