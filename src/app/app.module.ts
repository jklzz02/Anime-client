import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeComponent } from './anime/anime.component';
import { provideHttpClient } from '@angular/common/http';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoEmbedComponent } from './video-embed/video-embed.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AnimeSearchComponent } from './anime-search/anime-search.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import { AnimeSearchResultsComponent } from './anime-search-results/anime-search-results.component';
import { ErrorComponent } from './error/error.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
