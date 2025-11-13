import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Anime } from '../../../interfaces/anime';

@Component({
  selector: 'app-watchlist',
  standalone: false,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent implements OnInit {
  favourites: Anime[] = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getFavourites().subscribe((favourites) => {
      this.favourites = favourites;
    });
  }
}
