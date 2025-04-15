import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const isAuthRequest =
    req.url.includes('/auth/login') || req.url.includes('/auth/register');

  if (token && !isAuthRequest) {
    // console.log(' Adding Authorization header to request:', req.url);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  // console.log('Skipping token for auth request or missing token:', req.url);
  return next(req);
};

