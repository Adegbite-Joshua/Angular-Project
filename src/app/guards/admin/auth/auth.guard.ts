import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/admin/auth/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inject AuthService
  const router = inject(Router);            // Inject Router

  if (authService.checkLogin()) {
    return true;
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
}
