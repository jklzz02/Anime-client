import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  email: string;
  username: string;
  profile_picture: string;
  created_at: string;
  admin: boolean;
}

export interface UserFavourite {
  anime_id: number;
  user_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly API_URL = environment.anime_api_domain;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(`${this.API_URL}/user`, {
        withCredentials: true,
      })
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  getFavourites(): Observable<UserFavourite[]> {
    return this.http.get<UserFavourite[]>(`${this.API_URL}/user/favourite`, {
      withCredentials: true,
    });
  }

  addFavourite(animeId: number): Observable<UserFavourite> {
    return this.http.post<UserFavourite>(
      `${this.API_URL}/user/favourite`,
      animeId,
      {
        withCredentials: true,
      }
    );
  }

  removeFavourite(animeId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/user/favourite/${animeId}`, {
      withCredentials: true,
    });
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
  }
}
