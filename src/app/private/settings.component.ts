import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from './private-layout.component';

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
  saved: boolean = false;
  fusionopsStorage: { key: string, value: string, created?: string }[] = [];
  isAuthenticated = true; // TODO: Replace with real auth logic
  sortKey: 'key' | 'value' | 'created' = 'key';
  sortAsc: boolean = true;

  ngOnInit() {
    this.loadSecrets();
    this.loadFusionopsStorage();
  }

  onSignOut() {
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
        const value = localStorage.getItem(key) ?? '';
        // Try to get created date from metadata
        const metaKey = key + ':meta';
        let created: string | undefined = undefined;
        const meta = localStorage.getItem(metaKey);
        if (meta) {
          try {
            const metaObj = JSON.parse(meta);
            if (metaObj.created) created = metaObj.created;
          } catch {}
        }
        this.fusionopsStorage.push({ key, value, created });
      }
    }
    this.sortStorage();
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
    // Save created date if not present
    const metaKey = 'fusionops_secrets:meta';
    if (!localStorage.getItem(metaKey)) {
      localStorage.setItem(metaKey, JSON.stringify({ created: new Date().toISOString() }));
    }
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
    this.loadFusionopsStorage();
  }

  deleteKey(key: string) {
    if (confirm(`Are you sure you want to delete the key "${key}"?`)) {
      localStorage.removeItem(key);
      localStorage.removeItem(key + ':meta');
      this.loadFusionopsStorage();
    }
  }

  sortBy(col: 'key' | 'value' | 'created') {
    if (this.sortKey === col) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = col;
      this.sortAsc = true;
    }
    this.sortStorage();
  }

  sortStorage() {
    this.fusionopsStorage.sort((a, b) => {
      let aVal = a[this.sortKey] || '';
      let bVal = b[this.sortKey] || '';
      if (this.sortKey === 'created') {
        aVal = aVal || '';
        bVal = bVal || '';
      }
      if (aVal < bVal) return this.sortAsc ? -1 : 1;
      if (aVal > bVal) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }
}
