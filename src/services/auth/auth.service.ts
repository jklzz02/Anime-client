import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';

interface AuthResponse {
  user: any;
  access_token: string;
}

type AuthProvider = 'google' | 'facebook';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers: HttpHeaders = new HttpHeaders({
    'X-Client-Key': environment.x_client_key,
  });

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private authCheckComplete = new BehaviorSubject<boolean>(false);
  public authCheckComplete$ = this.authCheckComplete.asObservable();

  private readonly API_URL = environment.anime_api_domain;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.checkAuthStatus();
  }

  googleLogin(idToken: string): Observable<AuthResponse> {
    return this.loginWithProvider('google', { token: idToken });
  }

  facebookLogin(
    code: string,
    redirectUri: string,
    codeVerifier: string
  ): Observable<AuthResponse> {
    return this.loginWithProvider('facebook', {
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });
  }

  refreshToken(): Observable<boolean> {
    return this.http
      .post<{ access_token: string }>(
        `${this.API_URL}/auth/cookie/refresh`,
        {},
        { withCredentials: true, headers: this.headers }
      )
      .pipe(
        tap(() => this.isAuthenticatedSubject.next(true)),
        catchError(() => {
          this.isAuthenticatedSubject.next(false);
          return of(false);
        }),
        map((response) => !!response)
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(
        `${this.API_URL}/auth/cookie/logout`,
        {},
        { withCredentials: true, headers: this.headers }
      )
      .pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(false);
          this.userService.clearUser();
          this.router.navigate(['/signin']);
        }),
        catchError(() => {
          this.isAuthenticatedSubject.next(false);
          this.userService.clearUser();
          this.router.navigate(['/signin']);
          return of(undefined);
        })
      );
  }

  checkAuthStatus(): void {
    this.refreshToken().subscribe({
      complete: () => this.authCheckComplete.next(true),
    });
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  loginWithProvider(
    provider: string,
    payload:
      | { token: string }
      | { code: string; redirect_uri: string; code_verifier: string }
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.API_URL}/auth/cookie`,
        { provider, ...payload },
        { withCredentials: true, headers: this.headers }
      )
      .pipe(
        tap(() => this.isAuthenticatedSubject.next(true)),
        catchError((error) => {
          console.error('Login failed:', error);
          throw error;
        })
      );
  }
}
