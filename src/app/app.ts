import { Component, signal, inject } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isAuthenticated = signal(localStorage.getItem('fusionops_isAuthenticated') === 'true');
  router = inject(Router);

  onSignIn = () => {
    localStorage.setItem('fusionops_isAuthenticated', 'true');
    this.isAuthenticated.set(true);
    this.router.navigate(['/dashboard']);
  };

  onSignOut = () => {
    localStorage.removeItem('fusionops_isAuthenticated');
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  };
}
