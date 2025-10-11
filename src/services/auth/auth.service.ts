import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
  username: string;
  picture?: string;
}

interface AuthResponse {
  user: User;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private readonly API_URL = environment.anime_api_domain;

  constructor(private http: HttpClient, private router: Router) {}

  googleLogin(idToken: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.API_URL}/auth/cookie/google`,
        {
          id_token: idToken,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          this.setAuthState(response.user);
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          throw error;
        })
      );
  }

  refreshToken(): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(
        `${this.API_URL}/auth/cookie/refresh`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          this.setAuthState(response.user);
        }),
        catchError((error) => {
          console.error('Token refresh failed:', error);
          this.clearAuthState();
          return of(null);
        })
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(
        `${this.API_URL}/auth/cookie/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.clearAuthState();
          this.router.navigate(['/login']);
        }),
        catchError((error) => {
          console.error('Logout failed:', error);
          this.clearAuthState();
          this.router.navigate(['/login']);
          return of(undefined);
        })
      );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private setAuthState(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuthState(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
