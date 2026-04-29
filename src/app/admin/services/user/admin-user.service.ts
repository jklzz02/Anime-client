import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { PaginatedResult } from '../../../../interfaces/paginated-result';
import { User } from '../../../../interfaces/user';
import { UserDetails } from '../../interfaces/user-details';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private BASE: string = environment.anime_api_domain;

  constructor(private http: HttpClient) {}

  getUserList(
    page: number,
    pageSize: number,
  ): Observable<PaginatedResult<User>> {
    return this.http.get<PaginatedResult<User>>(`${this.BASE}/user/list`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
      },
    });
  }

  getUserDetails(userId: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(
      `${this.BASE}/admin/user-details/${userId}`,
    );
  }

  getLinkedUsersDetails(email: string): Observable<UserDetails[]> {
    if (!email) {
      return of([]);
    }

    const parameters = new HttpParams().set('email', email);
    return this.http.get<UserDetails[]>(
      `${this.BASE}/admin/linked-users-details`,
      {
        params: parameters,
      },
    );
  }

  unbanUser(email: string): Observable<void> {
    return this.http.post<void>(`${this.BASE}/admin/unban`, { email });
  }

  banUser(email: string): Observable<void>;
  banUser(email: string, reason: string): Observable<void>;
  banUser(
    email: string,
    reason?: string,
    expirationDate?: Date,
  ): Observable<void> {
    const params: any = { email };

    if (reason) {
      params.reason = reason;
    }
    if (expirationDate) {
      params.expiration = expirationDate.toUTCString();
    }

    return this.http.post<void>(`${this.BASE}/admin/ban`, { params });
  }
}
