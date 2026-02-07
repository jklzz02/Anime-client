import { Component, Input, OnInit } from '@angular/core';
import { Anime } from '../../interfaces/anime';

@Component({
  selector: 'app-anime-card',
  standalone: false,
  templateUrl: './anime-card.component.html',
  styleUrl: './anime-card.component.css',
})
export class AnimeCardComponent implements OnInit {
  @Input() anime!: Anime;
  fanFavourite: boolean = false;
  isNew: boolean = false;
  short: boolean = false;
  isImageLoaded: boolean = false;

  ngOnInit(): void {
    const now = new Date();
    const lastMonth = new Date(now);
    lastMonth.setMonth(now.getMonth() - 1);

    this.fanFavourite = this.anime.score >= 8;
    this.isNew = this.anime.started_airing >= lastMonth;
    this.short =
      this.anime.episodes <= 12 &&
      this.anime.episodes !== 0 &&
      !['movie', 'music', 'special', 'unkwown'].includes(
        this.anime.type.name.toLowerCase().trim()
      );
  }
}
