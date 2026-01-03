import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './anime/anime.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AnimeSearchResultsComponent } from './anime-search-results/anime-search-results.component';
import { ErrorComponent } from './error/error.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { WatchlistComponent } from './user/watchlist/watchlist.component';
import { GuestGuard } from '../guards/guest-guard.guard';
import { ReviewComponent } from './reviews/review/review.component';
import { OauthCallbackComponent } from './auth/oauth-callback/oauth-callback.component';
import { UserReviewComponent } from './reviews/user-review/user-review.component';

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
  { path: 'signin', component: SigninComponent, canActivate: [GuestGuard] },

  { path: 'reviews', redirectTo: 'reviews/1', pathMatch: 'full' },
  {
    path: 'reviews/:page',
    component: ReviewComponent,
    title: 'AnimeHub | Reviews',
  },
  {
    path: 'reviews/user/:userId',
    component: UserReviewComponent,
  },
  {
    path: 'search',
    component: AnimeSearchResultsComponent,
    title: 'AnimeHub | Explore',
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: HomeComponent, title: 'AnimeHub' },
  { path: 'auth/:provider/callback', component: OauthCallbackComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
