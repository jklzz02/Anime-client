import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../../interfaces/anime';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private http: HttpClient) {}
  private BASE: string = environment.anime_api_domain + '/api/Type';
  private headers: HttpHeaders = new HttpHeaders({
    'X-Client-Key': environment.x_client_key,
  });

  public getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.BASE, { headers: this.headers });
  }
}
