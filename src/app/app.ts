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
export class App implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSub?: Subscription;
  constructor(
    private router: Router,
    private auth: AuthService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.authSub = this.auth.auth$.subscribe((val: boolean) => {
      this.isAuthenticated = val;
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  onSignIn() {
    this.auth.signIn();
    this.router.navigate(['/dashboard']).then(() => {
      this.zone.run(() => {
        this.isAuthenticated = true;
      });
    });
  }

  onSignOut() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }
}
