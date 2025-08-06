import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  isAuthenticated = false;
  router = inject(Router);
  auth = inject(AuthService);
  private authSub?: Subscription;

  ngOnInit() {
    this.authSub = this.auth.auth$.subscribe(val => {
      this.isAuthenticated = val;
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  onSignIn = () => {
    this.auth.signIn();
    this.router.navigate(['/dashboard']);
  };

  onSignOut = () => {
    this.auth.signOut();
    this.router.navigate(['/']);
  };
}
