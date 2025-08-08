import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from '../shared/private-layout.component';
import { CarrierProfileService } from '../services/carrier-profile.service';

@Component({
  selector: 'app-carrier-profile',
  templateUrl: './carrier-profile.component.html',
  styleUrls: ['./carrier-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, PrivateLayoutComponent]
})
export class CarrierProfileComponent {
  isAuthenticated = true; // TODO: Replace with real auth logic

  onSignOut() {
    // TODO: Implement sign out logic
    this.isAuthenticated = false;
    window.location.href = '/';
  }
  carrierName = '';
  carrierProfile: any = null;
  carrierProfileError: string | null = null;

  get profileJson(): string {
    return this.carrierProfile ? JSON.stringify(this.carrierProfile, null, 2) : '';
  }

  constructor(private carrierProfileService: CarrierProfileService) {}

  getCarrierProfile() {
    this.carrierProfile = null;
    this.carrierProfileError = null;
    if (!this.carrierName.trim()) return;
    this.carrierProfileService.getCarrierProfile(this.carrierName.trim()).subscribe(result => {
      console.log('[CarrierProfileComponent] Response:', result);
      if (result && !result.error) {
        this.carrierProfile = result;
      } else {
        // Try to extract HTTP status and message
        let status = result?.error?.status || result?.status || '';
        let message = result?.error?.message || result?.error || result?.message || 'No profile found or API error.';
        if (typeof message === 'object') {
          message = JSON.stringify(message);
        }
        this.carrierProfileError = (status ? `HTTP ${status}: ` : '') + message;
      }
    }, err => {
      console.log('[CarrierProfileComponent] Error:', err);
      let status = err?.status || '';
      let message = err?.error?.message || err?.message || err?.error || 'API error.';
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      this.carrierProfileError = (status ? `HTTP ${status}: ` : '') + message;
    });
  }
}
