import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../interfaces/paginated-result';
import { ReviewDetailed } from '../../../interfaces/review-detailed';
import { Review } from '../../../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  private BASE: string = environment.anime_api_domain + '/api/Review';

  getAll(
    page: number,
    count: number,
  ): Observable<PaginatedResult<ReviewDetailed>> {
    const params = new HttpParams().set('page', page).set('size', count);
    return this.http.get<PaginatedResult<ReviewDetailed>>(
      `${this.BASE}/detailed`,
      { params },
    );
  }

  getById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.BASE}/${id}`);
  }

  getDetailedById(id: number): Observable<ReviewDetailed> {
    return this.http.get<ReviewDetailed>(`${this.BASE}/detailed/${id}`);
  }

  getByUser(userId: number): Observable<ReviewDetailed[]> {
    return this.http.get<ReviewDetailed[]>(
      `${this.BASE}/user/${userId}/detailed`,
    );
  }

  create(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(this.BASE, review);
  }

  update(review: Partial<Review>): Observable<Review> {
    const patchDoc = [];

    patchDoc.push({ op: 'replace', path: '/score', value: review.score });
    patchDoc.push({ op: 'replace', path: '/title', value: review.title });
    patchDoc.push({ op: 'replace', path: '/content', value: review.content });

    return this.http.patch<Review>(`${this.BASE}/${review.id}`, patchDoc);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/${id}`);
  }
}
