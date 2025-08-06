
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiStatusService } from '../api-status.service';
import { CarrierProfileService } from '../carrier-profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  apiStatus: { status: 'success' | 'error', message: string } | null = null;
  carrierName = '';
  carrierProfile: any = null;
  carrierProfileError: string | null = null;

  constructor(
    private apiStatusService: ApiStatusService,
    private carrierProfileService: CarrierProfileService
  ) {}

  ngOnInit() {
    this.apiStatusService.getStatus().subscribe(status => {
      this.apiStatus = status;
    });
  }

  getCarrierProfile() {
    this.carrierProfile = null;
    this.carrierProfileError = null;
    if (!this.carrierName.trim()) return;
    this.carrierProfileService.getCarrierProfile(this.carrierName.trim()).subscribe(result => {
      if (result && !result.error) {
        this.carrierProfile = result;
      } else {
        this.carrierProfileError = result?.error?.message || result?.error || 'No profile found or API error.';
      }
    });
  }
}