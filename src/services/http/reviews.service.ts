import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../interfaces/paginated-result';
import { Review } from '../../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private http: HttpClient) {}

  private BASE: string = environment.anime_api_domain + '/api/Review';
  private headers: HttpHeaders = new HttpHeaders({
    'X-Client-Key': environment.x_client_key,
  });

  getAll(page: number, count: number): Observable<PaginatedResult<Review>> {
    const params = new HttpParams().set('page', page).set('size', count);
    return this.http.get<PaginatedResult<Review>>(this.BASE, {
      headers: this.headers,
      params,
    });
  }

  getByUser(userId: number): Observable<Review[]> {
    const params = new HttpParams().set('user_id', userId);
    return this.http.get<Review[]>(`${this.BASE}/by-user`, {
      headers: this.headers,
      params,
    });
  }
}
