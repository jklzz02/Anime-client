import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../services/user/user.service';
import { finalize, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RecommenderService } from '../../../services/recommender/recommender.service';
import { AnimeService } from '../../../services/http/anime.service';
import { ScoredAnime } from '../../../interfaces/scored-anime';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;
  compatibles: ScoredAnime[] = [];

  loadingCompatibles = false;
  compatibleCount = 6;

  constructor(
    private title: Title,
    private animeService: AnimeService,
    private userService: UserService,
    private recommenderService: RecommenderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title.setTitle('AnimeHub | Profile');

    this.user$ = this.userService.currentUser$;
    this.userService.getCurrentUser().subscribe();

    this.loadCompatibles();
  }

  loadMore(): void {
    if (this.loadingCompatibles) return;

    this.compatibleCount += 6;
    this.loadCompatibles();
  }

  discoverNewAnime(): void {
    if (this.loadingCompatibles) return;

    this.compatibleCount = 6;
    this.loadCompatibles();
  }

  onExplore(): void {
    this.router.navigate(['/explore']);
  }

  onWatchlist(): void {
    this.router.navigate(['/watchlist']);
  }

  onReviews(): void {
    this.router.navigate(['/reviews']);
  }

  private loadCompatibles(): void {
    this.loadingCompatibles = true;

    this.userService
      .getFavourites()
      .pipe(
        map((favs) => favs.map((f) => f.anime_id)),

        switchMap((favouriteIds) =>
          this.recommenderService.getCompatible(
            favouriteIds,
            this.compatibleCount
          )
        ),

        switchMap((response) => {
          const scored = response.data;
          const ids = scored.map((s) => s.anime_id);

          return this.animeService.getAnimeById(ids).pipe(
            map((animeList) =>
              animeList.map((anime) => ({
                anime,
                score:
                  scored.find((s) => s.anime_id === anime.id)
                    ?.compatibility_score ?? 0,
              }))
            )
          );
        }),

        finalize(() => {
          this.loadingCompatibles = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.compatibles = result;
        },
        error: (err) => {
          if (err.status >= 500 || err.status == 0) {
            this.router.navigate(['/error'], {
              queryParams: { status: err.status },
            });
          }
          this.compatibles = [];
        },
      });
  }
}
