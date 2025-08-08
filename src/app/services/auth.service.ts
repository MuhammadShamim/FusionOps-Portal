import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(localStorage.getItem('fusionops_isAuthenticated') === 'true');
  auth$ = this.authSubject.asObservable();

  get isAuthenticated(): boolean {
    return this.authSubject.value;
  }

  signIn() {
    localStorage.setItem('fusionops_isAuthenticated', 'true');
    this.authSubject.next(true);
  }

  signOut() {
    localStorage.removeItem('fusionops_isAuthenticated');
    this.authSubject.next(false);
  }
}
