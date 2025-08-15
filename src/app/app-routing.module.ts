import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './anime/anime.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AnimeSearchResultsComponent } from './anime-search-results/anime-search-results.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'explore', redirectTo: 'explore/1', pathMatch: 'full' },
  {
    path: 'explore/:page',
    component: AnimeComponent,
    title: 'AnimeHub | Explore',
  },
  { path: 'detail/:id', component: AnimeDetailComponent },
  {
    path: 'search',
    component: AnimeSearchResultsComponent,
    title: 'AnimeHub | Explore',
  },
  { path: 'home', component: HomeComponent, title: 'AnimeHub' },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
