import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const sessionService = inject(SessionService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    return router.createUrlTree(['/auth/login']);
  }

  return sessionService.userInfo().pipe(
    map(user => {
      sessionStorage.setItem('user', JSON.stringify(user));
      return true
    }),
    catchError(() => {

      localStorage.removeItem('token');
      sessionStorage.removeItem('user');

      return of(router.createUrlTree(['/auth/login']))
    })
  )
};
