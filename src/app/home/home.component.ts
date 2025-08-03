import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private animeService: AnimeService,
    private title: Title,
    private router: Router
  ) {}

  recentAnime: Anime[] = [];
  loadCount: number = 33;
  counter: number[] = Array(this.loadCount);

  ngOnInit(): void {
    this.loadRecentAnime(this.loadCount);
    this.title.setTitle('AnimeHub');
  }

  public loadMore() {
    this.loadCount += 6;
    this.loadRecentAnime(this.loadCount);
  }

  private loadRecentAnime(count: number) {
    this.animeService.getRecent(count).subscribe({
      next: (data) => (this.recentAnime = data),
      error: (err) => {
        if (err.status >= 500 || err.status == 0) {
          this.router.navigate(['/error'], {
            queryParams: { status: err.status },
          });
        }
      },
    });
  }
}
