import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAll(page: number, count: number): Observable<PaginatedResult<Review>> {
    const params = new HttpParams().set('page', page).set('size', count);
    return this.http.get<PaginatedResult<Review>>(this.BASE, { params });
  }
}
