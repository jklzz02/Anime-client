import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private isLoggingOut = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addCredentials(request);

    if (request.url.includes('/auth/cookie/logout')) {
      this.isLoggingOut = true;
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 401 &&
          !this.isLoggingOut &&
          !this.isAuthEndpoint(request.url)
        ) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addCredentials(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      withCredentials: true,
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this.isRefreshing = false;
          if (response) {
            this.refreshTokenSubject.next(response);
            return next.handle(this.addCredentials(request));
          }
          this.performLogout();
          return throwError(() => new Error('Token refresh failed'));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.performLogout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap(() => next.handle(this.addCredentials(request)))
      );
    }
  }

  private performLogout(): void {
    if (!this.isLoggingOut) {
      this.isLoggingOut = true;
      this.authService.logout().subscribe({
        complete: () => {
          setTimeout(() => {
            this.isLoggingOut = false;
          }, 500);
        },
      });
    }
  }

  private isAuthEndpoint(url: string): boolean {
    return (
      url.includes('/auth/cookie') ||
      url.includes('/auth/cookie/refresh') ||
      url.includes('/auth/cookie/logout')
    );
  }
}
