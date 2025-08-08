
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from './private-layout.component';
import { ApiStatusService } from '../services/api-status.service';

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
    // TODO: Implement sign out logic
    this.isAuthenticated = false;
    window.location.href = '/';
  }
  apiStatus: { status: 'success' | 'error', message: string } | null = null;

  constructor(
    private apiStatusService: ApiStatusService,
    public authService: import('../services/auth.service').AuthService
  ) {}

  ngOnInit() {
    this.apiStatusService.getStatus().subscribe((status: { status: 'success' | 'error', message: string }) => {
      this.apiStatus = status;
    });
  }

}