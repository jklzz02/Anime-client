import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authCheckComplete$.pipe(
    filter((complete) => complete),
    take(1),
    switchMap(() => authService.isAuthenticated$),
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['/signin']);
    }),
  );
};
