import { Component, inject } from '@angular/core';
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
  isAuthenticated = localStorage.getItem('fusionops_isAuthenticated') === 'true';
  router = inject(Router);

  onSignIn = () => {
    localStorage.setItem('fusionops_isAuthenticated', 'true');
    this.isAuthenticated = true;
    this.router.navigate(['/dashboard']);
  };

  onSignOut = () => {
    localStorage.removeItem('fusionops_isAuthenticated');
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  };
}
