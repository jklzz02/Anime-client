import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './anime/anime/anime.component';
import { AnimeDetailComponent } from './anime/anime-detail/anime-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AnimeSearchResultsComponent } from './anime/anime-search-results/anime-search-results.component';
import { ErrorComponent } from './error/error.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { WatchlistComponent } from './user/watchlist/watchlist.component';
import { OauthCallbackComponent } from './auth/oauth-callback/oauth-callback.component';
import { authGuard } from '../guards/auth.guard';
import { guestGuard } from '../guards/guest-guard.guard';
import { adminGuard } from '../guards/admin.guard';

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
  { path: 'signin', component: SigninComponent, canActivate: [guestGuard] },
  {
    path: 'reviews',
    loadChildren: () =>
      import('./review/review.module').then((m) => m.ReviewModule),
  },
  {
    path: 'search',
    component: AnimeSearchResultsComponent,
    title: 'AnimeHub | Explore',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'AnimeHub | Profile',
    data: { authMessage: 'To access your Profile you must sign in first.' },
  },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    title: 'AnimeHub | Watchlist',
    canActivate: [authGuard],
    data: { authMessage: 'To access the Watchlist you must sign in first.' },
  },
  { path: 'home', component: HomeComponent, title: 'AnimeHub' },
  {
    path: 'auth/:provider/callback',
    component: OauthCallbackComponent,
    title: 'AnimeHub | Callback..',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard, adminGuard],
    data: { authMessage: 'Sign in to prove that you have admin privileges.' },
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: NotFoundComponent, title: 'AnimeHub | Not found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
