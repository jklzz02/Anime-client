import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs';

export class GuestGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          return true;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }
}
