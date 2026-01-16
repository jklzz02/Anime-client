import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AnimeRecommendation } from '../../interfaces/recommender/anime-recommendation';
import { forkJoin, Observable } from 'rxjs';
import { CompatibilityResponse } from '../../interfaces/recommender/compatibility-response';
import { CompatibleAnimeResponse } from '../../interfaces/recommender/compatible-anime-response';
import { ScoredResponse } from '../../interfaces/recommender/ScoredResponse';

@Injectable({
  providedIn: 'root',
})
export class RecommenderService {
  constructor(private http: HttpClient) {}

  private BASE: string = environment.recommender_api_domain + '/v1';

  getCompatible(
    userFavourites: number[],
    count: number,
  ): Observable<CompatibleAnimeResponse> {
    return this.http.post<CompatibleAnimeResponse>(`${this.BASE}/compatible`, {
      user_favourite_ids: userFavourites,
      limit: count,
    });
  }

  getCompatibility(
    targetAnime: number,
    userFavourites: number[],
  ): Observable<CompatibilityResponse> {
    return this.http.post<CompatibilityResponse>(
      `${this.BASE}/compatibility/score`,
      {
        target_anime_id: targetAnime,
        user_favourite_ids: userFavourites,
      },
    );
  }

  getCompatibilityScores(
    targetAnimes: number[],
    userFavourites: number[],
  ): Observable<CompatibilityResponse[]> {
    return forkJoin(
      targetAnimes.map((animeId) =>
        this.getCompatibility(animeId, userFavourites),
      ),
    );
  }

  getRelated(id: number, count: number): Observable<number[]> {
    const params = new HttpParams().set('anime_id', id).set('limit', count);

    return this.http.get<number[]>(`${this.BASE}/recommend`, {
      params: params,
    });
  }

  getByTextQuery(query: string, count: number): Observable<ScoredResponse[]> {
    const params = new HttpParams().set('q', query).set('limi', count);

    return this.http.get<ScoredResponse[]>(`${this.BASE}/recommend/text`, {
      params: params,
    });
  }

  getRecommendedForUser(
    userFavourites: number[],
    count: number,
  ): Observable<number[]> {
    return this.http.post<number[]>(`${this.BASE}/cf/recommend/user`, {
      user_favourite_ids: userFavourites,
      limit: count,
    });
  }

  getRelatedDetailed(
    id: number,
    count: number,
  ): Observable<AnimeRecommendation[]> {
    const params = new HttpParams().set('anime_id', id).set('limit', count);

    return this.http.get<AnimeRecommendation[]>(
      `${this.BASE}/recommend/detailed`,
      { params: params },
    );
  }
}
