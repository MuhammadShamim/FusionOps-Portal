import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from '../shared/private-layout.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [CommonModule, FormsModule, PrivateLayoutComponent]
})
export class SettingsComponent {
  activeTab: 'secrets' | 'storage' = 'secrets';
  apiId: string = '';
  secret: string = '';
  // apiBaseUrl: string = '';
  saved: boolean = false;
  fusionopsStorage: { key: string, value: string }[] = [];
  isAuthenticated = true; // TODO: Replace with real auth logic

  ngOnInit() {
    this.loadSecrets();
    this.loadFusionopsStorage();
  }

  onSignOut() {
    // TODO: Implement real sign out logic
    this.isAuthenticated = false;
    window.location.href = '/';
  }

  loadSecrets() {
    const encrypted = localStorage.getItem('fusionops_secrets');
    if (encrypted) {
      try {
        const decrypted = atob(encrypted);
        const { apiId, secret } = JSON.parse(decrypted);
        this.apiId = apiId;
        this.secret = secret;
      } catch {}
    }
  }

  loadFusionopsStorage() {
    this.fusionopsStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (key.startsWith('fusionops_')) {
        this.fusionopsStorage.push({ key, value: localStorage.getItem(key) ?? '' });
      }
    }
  }

  setTab(tab: 'secrets' | 'storage') {
    this.activeTab = tab;
    if (tab === 'storage') {
      this.loadFusionopsStorage();
    }
  }

  saveSecrets() {
    const data = { apiId: this.apiId, secret: this.secret };
    const encrypted = btoa(JSON.stringify(data));
    localStorage.setItem('fusionops_secrets', encrypted);
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
    this.loadFusionopsStorage();
  }
}
