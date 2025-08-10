import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../interfaces/anime';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private http: HttpClient) {}
  private BASE: string = environment.anime_api_domain + '/api/Type';

  public getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.BASE);
  }
}
