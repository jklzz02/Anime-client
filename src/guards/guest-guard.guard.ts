import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.authCheckComplete$.pipe(
      filter((complete) => complete),
      take(1),
      switchMap(() => this.authService.isAuthenticated$),
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return false;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }
}
