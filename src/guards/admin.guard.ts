import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { filter, map, switchMap, take, tap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const user = inject(UserService);

  return auth.authCheckComplete$.pipe(
    filter((complete) => complete),
    take(1),
    switchMap(() => user.getCurrentUser()),
    take(1),
    tap((currentUser) => {
      if (!currentUser?.admin) {
        router.navigate(['/error'], {
          state: {
            status: '401',
            message: "You're not authorized to see this resource",
          },
        });
      }
    }),
    map((currentUser) => {
      if (!currentUser) {
        return false;
      }

      return currentUser.admin;
    }),
  );
};
