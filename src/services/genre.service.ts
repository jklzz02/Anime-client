import { Injectable } from '@angular/core';
import { Genre } from '../interfaces/anime';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}
  private BASE: string = 'https://localhost:7145/api/Genre';

  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.BASE);
  }
}
