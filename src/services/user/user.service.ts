import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../interfaces/user';
import { UserFavourite } from '../../interfaces/user-favourite';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private BASE: string = environment.anime_api_domain;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(`${this.BASE}/user`)
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  getFavourites(): Observable<UserFavourite[]> {
    return this.http.get<UserFavourite[]>(`${this.BASE}/user/favourite`);
  }

  addFavourite(animeId: number): Observable<UserFavourite> {
    return this.http.post<UserFavourite>(
      `${this.BASE}/user/favourite`,
      animeId,
    );
  }

  getUserList(page: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE}/users`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
      },
    });
  }

  removeFavourite(animeId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/user/favourite/${animeId}`);
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

  clearUser(): void {
    this.currentUserSubject.next(null);
  }
}
