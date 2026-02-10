import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeComponent } from './anime/anime.component';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoEmbedComponent } from './video-embed/video-embed.component';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavButtonComponent } from './header/nav-button/nav-button.component';
import { AnimeSearchComponent } from './anime-search/anime-search.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
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
import { MarkdownEditorComponent } from './shared/markdown-editor/markdown-editor.component';
import { MultiDropdownComponent } from './shared/multi-dropdown/multi-dropdown.component';
import { SingleDropdownComponent } from './shared/single-dropdown/single-dropdown.component';
import { ReviewComponent } from './reviews/review/review.component';
import { FacebookButtonComponent } from './auth/facebook-button/facebook-button.component';
import { OauthCallbackComponent } from './auth/oauth-callback/oauth-callback.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DiscordButtonComponent } from './auth/discord-button/discord-button.component';
import { UserReviewComponent } from './reviews/user-review/user-review.component';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { ReviewCreateComponent } from './reviews/review-create/review-create.component';
import { AnimeSelectComponent } from './reviews/review-create/anime-select/anime-select.component';
import { ReviewUpdateComponent } from './reviews/review-update/review-update.component';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';
import { headerInterceptor } from '../interceptors/header/header.interceptor';
import { credentialsInterceptor } from '../interceptors/credentials/credentials.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AnimeComponent,
    AnimeDetailComponent,
    NotFoundComponent,
    VideoEmbedComponent,
    HomeComponent,
    HeaderComponent,
    NavButtonComponent,
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
    SpinnerComponent,
    DiscordButtonComponent,
    UserReviewComponent,
    ReviewDetailComponent,
    ReviewCreateComponent,
    AnimeSelectComponent,
    ReviewUpdateComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([credentialsInterceptor, headerInterceptor]),
      withInterceptorsFromDi(),
    ),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownEditorComponent),
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
