import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CompatibilityResponse } from '../../interfaces/recommender/compatibility-response';
import { CompatibleAnimeResponse } from '../../interfaces/recommender/compatible-anime-response';
import { AnimeSummary } from '../../interfaces/anime-summary';

@Injectable({
  providedIn: 'root',
})
export class RecommenderService {
  constructor(private http: HttpClient) {}

  private BASE: string = `${environment.anime_api_domain}/api/recommender`;

  getCompatibility(targetAnime: number): Observable<CompatibilityResponse> {
    let params = new HttpParams().set('target_anime_id', targetAnime);

    return this.http.get<CompatibilityResponse>(
      `${this.BASE}/compatibility/score`,
      { params },
    );
  }

  getCompatibilityScores(
    targetAnimes: number[],
  ): Observable<CompatibilityResponse[]> {
    return this.http.post<CompatibilityResponse[]>(
      `${this.BASE}/compatibility/scores`,
      { target_anime_ids: targetAnimes },
    );
  }

  getRelated(id: number, count: number): Observable<AnimeSummary[]> {
    const params = new HttpParams()
      .set('anime_id', id)
      .set('count', count)
      .set('type', 1);

    return this.http.get<AnimeSummary[]>(`${this.BASE}/related`, {
      params: params,
    });
  }

  getRecommendedForUser(count: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.BASE}/cf/user-recommendations`, {
      params: { count: count },
    });
  }
}
