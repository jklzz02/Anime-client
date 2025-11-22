import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Anime } from '../../../interfaces/anime';
import { AnimeService } from '../../../services/http/anime.service';

@Component({
  selector: 'app-watchlist',
  standalone: false,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent implements OnInit {
  favourites: Anime[] = [];

  constructor(
    private userService: UserService,
    private animeService: AnimeService
  ) {}
  ngOnInit(): void {
    this.userService.getFavourites().subscribe((favourites) => {
      const animeIds = favourites.map((fav) => fav.anime_id);
      this.animeService.getAnimeById(animeIds).subscribe((animeList) => {
        this.favourites = animeList;
      });
    });
  }
}
