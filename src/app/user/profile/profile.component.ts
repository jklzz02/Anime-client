import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { finalize, map, Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RecommenderService } from '../../../services/recommender/recommender.service';
import { AnimeService } from '../../../services/http/anime/anime.service';
import { CompatibilityResponse } from '../../../interfaces/recommender/compatibility-response';
import { ScoredAnime } from '../../../interfaces/scored-anime';
import { User } from '../../../interfaces/user';

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
  hasSearched = false;
  compatibleCount = 6;

  constructor(
    private title: Title,
    private animeService: AnimeService,
    private userService: UserService,
    private recommenderService: RecommenderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('AnimeHub | Profile');

    this.user$ = this.userService.currentUser$;
    this.userService.getCurrentUser().subscribe();
  }

  loadMore(): void {
    if (this.loadingCompatibles) return;

    this.compatibleCount += 6;
    this.loadCompatibles();
  }

  discoverNewAnime(): void {
    if (this.loadingCompatibles) return;

    this.compatibleCount = 6;
    this.hasSearched = true;
    this.loadCompatibles();
  }

  private loadCompatibles(): void {
    this.loadingCompatibles = true;

    this.userService
      .getFavourites()
      .pipe(
        map((favs) => favs.map((f) => f.anime_id)),
        switchMap((favouriteIds) =>
          this.recommenderService
            .getRecommendedForUser(favouriteIds, this.compatibleCount)
            .pipe(map((response) => ({ favouriteIds, response }))),
        ),
        switchMap(({ favouriteIds, response }) =>
          this.animeService
            .getAnimeById(response)
            .pipe(map((animes) => ({ favouriteIds, animes }))),
        ),
        switchMap(({ favouriteIds, animes }) =>
          this.recommenderService
            .getCompatibilityScores(
              animes.map((a) => a.id),
              favouriteIds,
            )
            .pipe(
              map((scores: CompatibilityResponse[]) => {
                const scoreMap = scores.reduce(
                  (acc, score) => {
                    acc[score.target_anime_id] = score.compatibility_score;
                    return acc;
                  },
                  {} as Record<number, number>,
                );

                return animes
                  .map(
                    (anime): ScoredAnime => ({
                      anime: anime,
                      score: scoreMap[anime.id] || 0,
                    }),
                  )
                  .sort((a, b) => b.score - a.score);
              }),
            ),
        ),
        finalize(() => {
          this.loadingCompatibles = false;
        }),
      )
      .subscribe({
        next: (result: ScoredAnime[]) => {
          this.compatibles = result;
        },
        error: (err) => {
          if (err.status >= 500 || err.status == 0) {
            this.router.navigate(['/error'], {
              state: { status: err.status },
            });
          }
          this.compatibles = [];
        },
      });
  }
}
