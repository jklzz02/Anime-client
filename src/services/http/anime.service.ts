import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Anime } from '../../interfaces/anime';
import { PaginatedResult } from '../../interfaces/paginated-result';
import { AnimeSummary } from '../../interfaces/anime-summary';
import { AnimeSearchParameters } from '../../interfaces/anime-search-parameters';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}
  private BASE: string = environment.anime_api_domain + '/api/Anime';

  getAnimeById(animeId: number): Observable<Anime>;
  getAnimeById(animeIds: number[]): Observable<Anime[]>;

  getAnimeById(input: number | number[]): Observable<Anime | Anime[]> {
    if (Array.isArray(input)) {
      return forkJoin(input.map((id) => this.getAnimeById(id)));
    }
    return this.http.get<Anime>(`${this.BASE}/${input}`);
  }

  getAnimeByTitle(
    title: string,
    page: number,
    count: number
  ): Observable<PaginatedResult<Anime>> {
    const params: HttpParams = new HttpParams()
      .set('title', title)
      .set('page', page.toString())
      .set('size', count.toString());

    return this.http.get<PaginatedResult<Anime>>(`${this.BASE}/search`, {
      params,
    });
  }

  getPaginatedAnime(
    page: number,
    count: number
  ): Observable<PaginatedResult<Anime>> {
    const params: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', count.toString());

    return this.http.get<PaginatedResult<Anime>>(this.BASE, { params });
  }

  getRecent(count: number): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.BASE}/recent?count=${count}`);
  }

  getSummaries(count: number): Observable<AnimeSummary[]> {
    return this.http.get<AnimeSummary[]>(`${this.BASE}/summary?count=${count}`);
  }

  searchAnime(
    parameters: AnimeSearchParameters,
    page: number,
    count: number
  ): Observable<PaginatedResult<Anime>> {
    let params = new HttpParams();

    Object.entries(parameters).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v) params = params.append(key, v);
        });
      } else if (value !== '') {
        params = params.append(key, value.toString());
      }
    });

    params = params
      .append('page', page.toString())
      .append('size', count.toString());

    return this.http.get<PaginatedResult<Anime>>(`${this.BASE}/search`, {
      params,
    });
  }
}
