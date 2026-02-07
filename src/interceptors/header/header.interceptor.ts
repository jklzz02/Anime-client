import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = req.headers;

  if (
    !headers.has('X-Client-Key') &&
    req.url.startsWith(environment.anime_api_domain)
  ) {
    headers = headers.set('X-Client-Key', environment.x_client_key);
  }

  if (req.method === 'PATCH' && !headers.has('Content-Type')) {
    headers = headers.set('Content-Type', 'application/json-patch+json');
  }

  if (headers !== req.headers) {
    req = req.clone({ headers });
  }

  return next(req);
};
