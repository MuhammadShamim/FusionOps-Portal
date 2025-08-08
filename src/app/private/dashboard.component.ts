
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from '../shared/private-layout.component';
import { ApiStatusService } from '../services/api-status.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, PrivateLayoutComponent]
})
export class DashboardComponent implements OnInit {
  apiStatus: { status: 'success' | 'error', message: string } | null = null;

  constructor(
    private apiStatusService: ApiStatusService,
  ) {}

  ngOnInit() {
    this.apiStatusService.getStatus().subscribe((status: { status: 'success' | 'error', message: string }) => {
      this.apiStatus = status;
    });
  }

}