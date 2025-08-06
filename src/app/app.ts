import { Component, inject, OnInit, OnDestroy, NgZone } from '@angular/core';
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
  isAuthenticated = false;
  router = inject(Router);
  auth = inject(AuthService);
  zone = inject(NgZone);
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
    this.router.navigate(['/dashboard']).then(() => {
      this.zone.run(() => {
        // This will force Angular to run change detection
        this.isAuthenticated = true;
      });
    });
  };

  onSignOut = () => {
    this.auth.signOut();
    this.router.navigate(['/']);
  };
}
