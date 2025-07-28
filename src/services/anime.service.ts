import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Anime } from '../interfaces/anime';
import { PaginatedAnime } from '../interfaces/paginated-anime';
import { AnimeSummary } from '../interfaces/anime-summary';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}
  private BASE: string = 'https://localhost:7145/api/Anime';

  getAnimeById(animeId: number): Observable<Anime>;
  getAnimeById(animeIds: number[]): Observable<Anime[]>;

  getAnimeById(input: number | number[]): Observable<Anime | Anime[]> {
    if (Array.isArray(input)) {
      return forkJoin(input.map((id) => this.getAnimeById(id)));
    }
    return this.http.get<Anime>(`${this.BASE}/${input}`);
  }

  getAnimeByTitle(title: string): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.BASE}/title/${title}`);
  }

  getPaginatedAnime(page: number, count: number): Observable<PaginatedAnime> {
    return this.http.get<PaginatedAnime>(
      `${this.BASE}?page=${page}&size=${count}`
    );
  }

  getSummaries(count: number): Observable<AnimeSummary[]> {
    return this.http.get<AnimeSummary[]>(`${this.BASE}?count=${count}`);
  }
}
