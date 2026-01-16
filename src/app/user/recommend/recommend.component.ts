import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../../services/http/anime.service';
import { RecommenderService } from '../../../services/recommender/recommender.service';
import { map, switchMap } from 'rxjs';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserFavourite } from '../../../interfaces/user-favourite';
import { ScoredSummary } from '../../../interfaces/scored-anime';

@Component({
  selector: 'app-recommend',
  standalone: false,
  templateUrl: './recommend.component.html',
  styleUrl: './recommend.component.css',
})
export class RecommendComponent implements OnInit {
  summaries: ScoredSummary[] = [];
  favourites: UserFavourite[] = [];
  query: string = '';

  constructor(
    private animeService: AnimeService,
    private authService: AuthService,
    private recommenderService: RecommenderService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['error'], {
        queryParams: { status: 401, message: 'Unauthorized' },
      });
    }

    this.userService
      .getFavourites()
      .subscribe((fav) => (this.favourites = fav));
  }

  onSubmit(): void {
    if (!this.query.trim()) {
      return;
    }

    this.recommenderService
      .getByTextQuery(this.query, 12)
      .pipe(
        switchMap((results) =>
          this.animeService.getSummariesByIds(results.map((r) => r.anime_id)),
        ),

        switchMap((summaries) =>
          this.recommenderService
            .getCompatibilityScores(
              this.favourites.map((fav) => fav.anime_id),
              summaries.map((s) => s.id),
            )
            .pipe(
              map((scores) =>
                summaries.map((summary) => ({
                  summary: summary,
                  score:
                    scores.find((score) => score.target_anime_id === summary.id)
                      ?.compatibility_score ?? 0,
                })),
              ),
            ),
        ),
      )
      .subscribe((scoredSummaries) => {
        this.summaries = scoredSummaries;
      });
  }
}
