import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeComponent } from './anime/anime/anime.component';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AnimeDetailComponent } from './anime/anime-detail/anime-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoEmbedComponent } from './shared/video-embed/video-embed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavButtonComponent } from './header/nav-button/nav-button.component';
import { AnimeSearchComponent } from './anime/anime-search/anime-search.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { AnimeCardComponent } from './anime/anime-card/anime-card.component';
import { AnimeSearchResultsComponent } from './anime/anime-search-results/anime-search-results.component';
import { ErrorComponent } from './error/error.component';
import { AnimeSummaryCardComponent } from './anime/anime-summary-card/anime-summary-card.component';
import { AnimeFilterComponent } from './anime/anime-filter/anime-filter.component';
import { GoogleButtonComponent } from './auth/google-button/google-button.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { WatchlistComponent } from './user/watchlist/watchlist.component';
import { CommonModule } from '@angular/common';
import { FacebookButtonComponent } from './auth/facebook-button/facebook-button.component';
import { OauthCallbackComponent } from './auth/oauth-callback/oauth-callback.component';
import { DiscordButtonComponent } from './auth/discord-button/discord-button.component';
import { headerInterceptor } from '../interceptors/header/header.interceptor';
import { credentialsInterceptor } from '../interceptors/credentials/credentials.interceptor';
import { SharedModule } from './shared/shared.module';
import { AnimeCardSkeletonComponent } from './anime/anime-card/anime-card-skeleton/anime-card-skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimeComponent,
    AnimeDetailComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    NavButtonComponent,
    AnimeSearchComponent,
    AboutComponent,
    FooterComponent,
    AnimeCardComponent,
    AnimeSearchResultsComponent,
    ErrorComponent,
    AnimeSummaryCardComponent,
    AnimeFilterComponent,
    GoogleButtonComponent,
    SigninComponent,
    ProfileComponent,
    WatchlistComponent,
    FacebookButtonComponent,
    OauthCallbackComponent,
    DiscordButtonComponent,
    AnimeCardSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([credentialsInterceptor, headerInterceptor]),
      withInterceptorsFromDi(),
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
