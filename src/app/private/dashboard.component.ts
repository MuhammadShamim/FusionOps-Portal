import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from './private-layout.component';
import { ApiStatusService } from '../services/api-status.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, PrivateLayoutComponent]
})
export class DashboardComponent implements OnInit {
  isAuthenticated = true; // TODO: Replace with real auth logic

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
  apiStatus: { status: 'success' | 'error', message: string } | null = null;

  constructor(
    private apiStatusService: ApiStatusService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiStatusService.getStatus().subscribe((status: { status: 'success' | 'error', message: string }) => {
      this.apiStatus = status;
    });
  }

}