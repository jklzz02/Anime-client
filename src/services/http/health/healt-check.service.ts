import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CacheHealthResponse } from '../../../interfaces/cache-health-response';

@Injectable({
  providedIn: 'root',
})
export class HealtCheckService {
  private BASE: string = `${environment.anime_api_domain}/health`;

  constructor(private http: HttpClient) {}

  getCacheHealthStatus(): Observable<CacheHealthResponse> {
    return this.http.get<CacheHealthResponse>(`${this.BASE}/cache`, {
      withCredentials: true,
    });
  }
}
