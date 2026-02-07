import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/http/anime/anime.service';
import { Anime } from '../../interfaces/anime';
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
    private router: Router,
  ) {}

  recentAnime: Anime[] = [];
  loadCount: number = 33;
  stepCount: number = 6;
  counter: number[] = Array(this.loadCount);
  stepCounter: number[] = Array(this.stepCount);
  loading: boolean = false;
  loadedImages: Set<number> = new Set();

  ngOnInit(): void {
    this.loadRecentAnime(this.loadCount);
  }

  public onImageLoad(id: number) {
    this.loadedImages.add(id);
  }

  public isImageLoaded(id: number): boolean {
    return this.loadedImages.has(id);
  }

  public loadMore() {
    this.loadCount += this.stepCount;
    this.loadRecentAnime(this.loadCount);
  }

  private loadRecentAnime(count: number) {
    this.loading = true;

    this.animeService.getRecent(count).subscribe({
      next: (data) => (this.recentAnime = data),
      error: (err) => {
        if (err.status >= 500 || err.status == 0) {
          this.router.navigate(['/error'], {
            state: { status: err.status },
          });
        }
      },
      complete: () => (this.loading = false),
    });
  }
}
