import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AnimeRecommendation } from '../../interfaces/anime-recommendation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommenderService {
  constructor(private http: HttpClient) {}

  private BASE: string = environment.recommender_api_domain + '/v1';

  getRelated(id: number, count: number): Observable<number[]> {
    console.log(`${this.BASE}/recommend?anime_id=${id}&limit=${count}`);

    return this.http.get<number[]>(
      `${this.BASE}/recommend?anime_id=${id}&limit=${count}`
    );
  }

  getRelatedDetailed(
    id: number,
    count: number
  ): Observable<AnimeRecommendation[]> {
    return this.http.get<AnimeRecommendation[]>(
      `${this.BASE}/recommend/detailed?anime_id=${id}&limit=${count}`
    );
  }
}
