import { Injectable } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (_route, state) => {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/signin']);
      return false;
    }
    
    // Store the attempted URL for redirecting
    this.authService.storeCurrentRoute(state.url);
    return true;
  };
}