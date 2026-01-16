import { Component } from '@angular/core';
import { AnimeService } from '../../../services/http/anime.service';
import { RecommenderService } from '../../../services/recommender/recommender.service';
import { AnimeSummary } from '../../../interfaces/anime-summary';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-recommend',
  standalone: false,
  templateUrl: './recommend.component.html',
  styleUrl: './recommend.component.css',
})
export class RecommendComponent {
  summaries: AnimeSummary[] = [];
  query: string = '';

  constructor(
    private animeService: AnimeService,
    private recommenderService: RecommenderService,
  ) {}

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
      )
      .subscribe((anime) => {
        this.summaries = anime;
      });
  }
}
