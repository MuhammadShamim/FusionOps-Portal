import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout.component';
import { CarrierProfileService } from '../carrier-profile.service';

@Component({
  selector: 'app-carrier-profile',
  templateUrl: './carrier-profile.component.html',
  styleUrls: ['./carrier-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent]
})
export class CarrierProfileComponent {
  carrierName = '';
  carrierProfile: any = null;
  carrierProfileError: string | null = null;

  constructor(private carrierProfileService: CarrierProfileService) {}

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
    }, err => {
      this.carrierProfileError = err?.message || 'API error.';
    });
  }
}
