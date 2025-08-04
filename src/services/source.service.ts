import { Injectable } from '@angular/core';
import { Source } from '../interfaces/anime';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor(private http: HttpClient) {}
  private BASE: string = 'https://localhost:7145/api/Source';

  public getSources(): Observable<Source[]> {
    return this.http.get<Source[]>(this.BASE);
  }
}
