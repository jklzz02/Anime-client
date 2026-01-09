import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../interfaces/paginated-result';
import { ReviewDetailed } from '../../interfaces/review-detailed';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  private BASE: string = environment.anime_api_domain + '/api/Review';
  private headers: HttpHeaders = new HttpHeaders({
    'X-Client-Key': environment.x_client_key,
  });

  getAll(
    page: number,
    count: number
  ): Observable<PaginatedResult<ReviewDetailed>> {
    const params = new HttpParams().set('page', page).set('size', count);
    return this.http.get<PaginatedResult<ReviewDetailed>>(
      `${this.BASE}/detailed`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  getDetailedById(id: number): Observable<ReviewDetailed> {
    return this.http.get<ReviewDetailed>(`${this.BASE}/detailed/${id}`, {
      headers: this.headers,
    });
  }

  getByUser(userId: number): Observable<ReviewDetailed[]> {
    return this.http.get<ReviewDetailed[]>(
      `${this.BASE}/user/${userId}/detailed`,
      {
        headers: this.headers,
      }
    );
  }
}
