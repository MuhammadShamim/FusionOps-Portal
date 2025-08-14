import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(localStorage.getItem('integrationops_isAuthenticated') === 'true');
  auth$ = this.authSubject.asObservable();

  constructor(private router: Router) {
    // Check authentication on startup
    if (this.isAuthenticated) {
      this.redirectToLastRoute();
    }
  }

  get isAuthenticated(): boolean {
    return this.authSubject.value;
  }

  signIn(_username: string = 'default', _password: string = 'default'): boolean {
    // TODO: Replace with real auth logic
    localStorage.setItem('integrationops_isAuthenticated', 'true');
    this.authSubject.next(true);
    this.redirectToLastRoute();
    return true;
  }

  signOut() {
    localStorage.removeItem('integrationops_isAuthenticated');
    localStorage.removeItem('integrationops_lastRoute');
    this.authSubject.next(false);
    this.router.navigate(['/']);
  }

  private redirectToLastRoute() {
    const lastRoute = localStorage.getItem('integrationops_lastRoute') || '/app/dashboard';
    this.router.navigate([lastRoute]);
  }

  storeCurrentRoute(route: string) {
    if (route.startsWith('/app/')) {
      localStorage.setItem('integrationops_lastRoute', route);
    }
  }

  canActivate() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
}
