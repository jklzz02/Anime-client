import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { UserService } from '../services/user/user.service';

export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.authCheckComplete$.pipe(
      filter((complete) => complete),
      take(1),
      switchMap(() => this.authService.isAuthenticated$),
      take(1),
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          return [this.router.createUrlTree(['/signin'])];
        }
        return this.userService.getCurrentUser().pipe(
          map((user) => {
            if (user.admin) {
              return true;
            } else {
              return this.router.createUrlTree(['/error'], {
                queryParams: { status: 401, message: 'Access denied' },
              });
            }
          })
        );
      })
    );
  }
}
