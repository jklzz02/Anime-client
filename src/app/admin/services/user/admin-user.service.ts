import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { PaginatedResult } from '../../../../interfaces/paginated-result';
import { User } from '../../../../interfaces/user';

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

  unbanUser(email: string): Observable<void> {
    return this.http.post<void>(`${this.BASE}/user/unban`, { email });
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

    return this.http.post<void>(`${this.BASE}/user/ban`, { params });
  }
}
