import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    !req.withCredentials &&
    req.url.startsWith(environment.anime_api_domain)
  ) {
    req = req.clone({
      withCredentials: true,
    });
  }

  return next(req);
};
