import { Injectable } from '@angular/core';
import { Genre } from '../../../interfaces/anime';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}
  private BASE: string = environment.anime_api_domain + '/api/Genre';

  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.BASE);
  }
}
