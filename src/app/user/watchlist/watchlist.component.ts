import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { AnimeService } from '../../../services/http/anime/anime.service';
import { Title } from '@angular/platform-browser';
import { AnimeSummary } from '../../../interfaces/anime-summary';

@Component({
  selector: 'app-watchlist',
  standalone: false,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent implements OnInit {
  favourites: AnimeSummary[] = [];
  loadingFavourites: boolean = true;
  placeholdersCount: number = 20;

  constructor(
    private animeService: AnimeService,
    private title: Title,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.title.setTitle('AnimeHub | Watchlist');

    this.loadFavourites();
  }

  removeFromWatchlist(animeId: number): void {
    this.userService.removeFavourite(animeId).subscribe(() => {
      this.favourites = this.favourites.filter((anime) => anime.id !== animeId);
      this.loadFavourites();
    });
  }

  private loadFavourites(): void {
    this.userService.getFavourites().subscribe((favourites) => {
      const animeIds = favourites.map((fav) => fav.anime_id);

      if (animeIds.length === 0) {
        this.favourites = [];
        this.loadingFavourites = false;
        return;
      }

      this.animeService.getSummariesByIds(animeIds).subscribe((animeList) => {
        this.favourites = animeList;
        this.loadingFavourites = false;
      });
    });
  }
}
