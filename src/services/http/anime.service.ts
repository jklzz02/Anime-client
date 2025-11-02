import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Anime } from '../../interfaces/anime';
import { PaginatedAnime } from '../../interfaces/paginated-anime';
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
  ): Observable<PaginatedAnime> {
    return this.http.get<PaginatedAnime>(
      `${this.BASE}/search?title=${title}&page=${page}&size=${count}`
    );
  }

  getPaginatedAnime(page: number, count: number): Observable<PaginatedAnime> {
    return this.http.get<PaginatedAnime>(
      `${this.BASE}?page=${page}&size=${count}`
    );
  }

  getRecent(count: number): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.BASE}/recent?count=${count}`);
  }

  getSummaries(count: number): Observable<AnimeSummary[]> {
    return this.http.get<AnimeSummary[]>(`${this.BASE}/summary?count=${count}`);
  }

  getRelatedSummaries(id: number, count: number): Observable<AnimeSummary[]> {
    return this.http.get<AnimeSummary[]>(
      `${this.BASE}/related?id=${id}&count=${count}`
    );
  }

  searchAnime(
    parameters: AnimeSearchParameters,
    page: number,
    count: number
  ): Observable<PaginatedAnime> {
    const request =
      this.BASE +
      '/search' +
      this.buildQuery(parameters) +
      '&page=' +
      page +
      '&size=' +
      count;

    console.log('Anime search request:', request);
    return this.http.get<PaginatedAnime>(request);
  }

  private buildQuery(parameters: AnimeSearchParameters): string {
    const params: string[] = [];

    Object.entries(parameters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    });

    return params.length ? '?' + params.join('&') : '';
  }
}
