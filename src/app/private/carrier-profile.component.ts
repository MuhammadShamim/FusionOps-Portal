import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CarrierProfileService } from '../carrier-profile.service';

@Component({
  selector: 'app-carrier-profile',
  templateUrl: './carrier-profile.component.html',
  styleUrls: ['./carrier-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent, MonacoEditorModule]
})
export class CarrierProfileComponent {
  carrierName = '';
  carrierProfile: any = null;
  carrierProfileError: string | null = null;
  editorOptions = { theme: 'vs-light', language: 'json', readOnly: true, automaticLayout: true };
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
