import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../interfaces/user';
import { UserFavourite } from '../../interfaces/user-favourite';
import { PublicUser } from '../../interfaces/public-user';

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

  destroyCurrentUser(): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/user`);
  }

  getFavourites(): Observable<UserFavourite[]> {
    return this.http.get<UserFavourite[]>(`${this.BASE}/user/favourite`);
  }

  getUserList(
    count: number,
    textQuery: string | null,
  ): Observable<PublicUser[]> {
    let params = new HttpParams().append('count', count);

    if (textQuery) {
      params = params.append('q', textQuery);
    }

    return this.http.get<PublicUser[]>(`${this.BASE}/user/by-query`, {
      params: params,
    });
  }

  addFavourite(animeId: number): Observable<UserFavourite> {
    return this.http.post<UserFavourite>(
      `${this.BASE}/user/favourite`,
      animeId,
    );
  }

  removeFavourite(animeId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE}/user/favourite/${animeId}`);
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
  }
}
