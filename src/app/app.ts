import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet]
})
export class AppComponent {
  constructor(private auth: AuthService) {}

  // Handle authentication status
  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }
}
