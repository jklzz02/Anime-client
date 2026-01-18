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
  private headers: HttpHeaders = new HttpHeaders({
    'X-Client-Key': environment.x_client_key,
  });

  getAll(
    page: number,
    count: number,
  ): Observable<PaginatedResult<ReviewDetailed>> {
    const params = new HttpParams().set('page', page).set('size', count);
    return this.http.get<PaginatedResult<ReviewDetailed>>(
      `${this.BASE}/detailed`,
      {
        headers: this.headers,
        params,
      },
    );
  }

  getById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.BASE}/${id}`, {
      headers: this.headers,
    });
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
      },
    );
  }

  create(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(this.BASE, review, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  update(review: Partial<Review>): Observable<Review> {
    const patchDoc = [];

    console.log('Updating review:', review);
    patchDoc.push({ op: 'replace', path: '/score', value: review.score });
    patchDoc.push({ op: 'replace', path: '/title', value: review.title });
    patchDoc.push({ op: 'replace', path: '/content', value: review.content });

    console.log('Patch document:', patchDoc);

    return this.http.patch<Review>(`${this.BASE}/${review.id}`, patchDoc, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/${id}`, {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
