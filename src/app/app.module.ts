import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeComponent } from './anime/anime.component';
import { provideHttpClient } from '@angular/common/http';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoEmbedComponent } from './video-embed/video-embed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AnimeSearchComponent } from './anime-search/anime-search.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import { AnimeSearchResultsComponent } from './anime-search-results/anime-search-results.component';
import { ErrorComponent } from './error/error.component';
import { AnimeSummaryCardComponent } from './anime-summary-card/anime-summary-card.component';
import { FilterComponent } from './filter/filter.component';
import { GoogleButtonComponent } from './auth/google-button/google-button.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { WatchlistComponent } from './user/watchlist/watchlist.component';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from './reviews/markdown-editor/markdown-editor.component';
import { MultiDropdownComponent } from './filter/multi-dropdown/multi-dropdown.component';
import { SingleDropdownComponent } from './filter/single-dropdown/single-dropdown.component';
import { ReviewComponent } from './reviews/review/review.component';
import { FacebookButtonComponent } from './auth/facebook-button/facebook-button.component';
import { OauthCallbackComponent } from './auth/oauth-callback/oauth-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimeComponent,
    AnimeDetailComponent,
    NotFoundComponent,
    VideoEmbedComponent,
    HomeComponent,
    HeaderComponent,
    AnimeSearchComponent,
    AboutComponent,
    FooterComponent,
    PaginationComponent,
    AnimeCardComponent,
    AnimeSearchResultsComponent,
    ErrorComponent,
    AnimeSummaryCardComponent,
    FilterComponent,
    GoogleButtonComponent,
    SigninComponent,
    ProfileComponent,
    WatchlistComponent,
    MarkdownEditorComponent,
    MultiDropdownComponent,
    SingleDropdownComponent,
    ReviewComponent,
    FacebookButtonComponent,
    OauthCallbackComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
