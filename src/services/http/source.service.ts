import { Injectable } from '@angular/core';
import { Source } from '../../interfaces/anime';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor(private http: HttpClient) {}
  private BASE: string = environment.anime_api_domain + '/api/Source';
  private headers: HttpHeaders = new HttpHeaders({
    'X-Client-Key': environment.x_client_key,
  });

  public getSources(): Observable<Source[]> {
    return this.http.get<Source[]>(this.BASE, { headers: this.headers });
  }
}
