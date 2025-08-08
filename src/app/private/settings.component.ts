import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from './private-layout.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [CommonModule, FormsModule, PrivateLayoutComponent]
})
export class SettingsComponent {
  auth$;
  constructor(public authService: AuthService) {
    this.auth$ = this.authService.auth$;
  }

  areAllStorageSelected(): boolean {
    const items = this.getFilteredSortedStorage();
    return items.length > 0 && items.every(i => this.selectedRows.has(i.key));
  }

  getVisibleStorageColspan(): number {
    return this.columns.filter(c => c.visible).length + 2;
  }

  onSignOut() {
    this.authService.signOut();
    window.location.href = '/';
  }

  activeTab: 'secrets' | 'storage' | 'pagerduty' = 'secrets';
  apiId: string = '';
  secret: string = '';
  saved: boolean = false;
  pagerDutyToken: string = '';
  pagerDutySaved: boolean = false;
  fusionopsStorage: { key: string, value: string }[] = [];
  sortKeys: { key: 'key' | 'value', asc: boolean }[] = [{ key: 'key', asc: true }];
  columns = [
    { key: 'key', label: 'Key', visible: true },
    { key: 'value', label: 'Value', visible: true }
  ];
  selectedRows: Set<string> = new Set();

  ngOnInit() {
    this.loadSecrets();
    this.loadFusionopsStorage();
  }

  // removed duplicate onSignOut and isAuthenticated reference

  loadSecrets() {
    const encrypted = localStorage.getItem('fusionops_secrets');
    if (encrypted) {
      try {
        const decrypted = atob(encrypted);
        const { apiId, secret, pagerDutyToken } = JSON.parse(decrypted);
        this.apiId = apiId;
        this.secret = secret;
        this.pagerDutyToken = pagerDutyToken || '';
      } catch {}
    }
  }

  savePagerDutyToken() {
    const encrypted = localStorage.getItem('fusionops_secrets');
    let data = { apiId: '', secret: '', pagerDutyToken: this.pagerDutyToken };
    if (encrypted) {
      try {
        const decrypted = atob(encrypted);
        data = { ...data, ...JSON.parse(decrypted), pagerDutyToken: this.pagerDutyToken };
      } catch {}
    }
    const newEncrypted = btoa(JSON.stringify(data));
    localStorage.setItem('fusionops_secrets', newEncrypted);
    this.pagerDutySaved = true;
    setTimeout(() => (this.pagerDutySaved = false), 2000);
  }

  loadFusionopsStorage() {
    this.fusionopsStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (key.startsWith('fusionops_')) {
        const value = localStorage.getItem(key) ?? '';
        this.fusionopsStorage.push({ key, value });
      }
    }
    this.sortStorage();
  }

  setTab(tab: 'secrets' | 'storage' | 'pagerduty') {
    this.activeTab = tab;
    if (tab === 'storage') {
      this.loadFusionopsStorage();
    }
  }

  saveSecrets() {
    const data = { apiId: this.apiId, secret: this.secret, pagerDutyToken: this.pagerDutyToken };
    const encrypted = btoa(JSON.stringify(data));
    localStorage.setItem('fusionops_secrets', encrypted);
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
    this.loadFusionopsStorage();
  }

  deleteKey(key: string) {
    if (confirm(`Are you sure you want to delete the key "${key}"?`)) {
      localStorage.removeItem(key);
      // Removed the line that deletes metadata
      this.loadFusionopsStorage();
    }
  }

  sortBy(col: 'key' | 'value', event?: MouseEvent) {
    if (event && event.shiftKey) {
      const idx = this.sortKeys.findIndex(s => s.key === col);
      if (idx > -1) {
        this.sortKeys[idx].asc = !this.sortKeys[idx].asc;
      } else {
        this.sortKeys.push({ key: col, asc: true });
      }
    } else {
      if (this.sortKeys.length === 1 && this.sortKeys[0].key === col) {
        this.sortKeys[0].asc = !this.sortKeys[0].asc;
      } else {
        this.sortKeys = [{ key: col, asc: true }];
      }
    }
    this.sortStorage();
  }

  sortStorage() {
    this.fusionopsStorage.sort((a, b) => {
      for (const sort of this.sortKeys) {
        let aVal = a[sort.key] || '';
        let bVal = b[sort.key] || '';
        if (aVal < bVal) return sort.asc ? -1 : 1;
        if (aVal > bVal) return sort.asc ? 1 : -1;
      }
      return 0;
    });
  }

  toggleColumn(col: any) {
    col.visible = !col.visible;
  }

  toggleRowSelection(key: string) {
    if (this.selectedRows.has(key)) {
      this.selectedRows.delete(key);
    } else {
      this.selectedRows.add(key);
    }
  }

  selectAllOnPage() {
    this.getFilteredSortedStorage().forEach(item => this.selectedRows.add(item.key));
  }

  clearSelection() {
    this.selectedRows.clear();
  }

  getFilteredSortedStorage() {
    let filtered = this.fusionopsStorage;
    // No search for now, but could add if needed
    filtered = [...filtered];
    filtered.sort((a, b) => {
      for (const sort of this.sortKeys) {
        let aVal = a[sort.key] || '';
        let bVal = b[sort.key] || '';
        if (aVal < bVal) return sort.asc ? -1 : 1;
        if (aVal > bVal) return sort.asc ? 1 : -1;
      }
      return 0;
    });
    return filtered;
  }

  downloadStorageCSV(selectedOnly = false) {
    const visibleCols = this.columns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const items = this.getFilteredSortedStorage();
    const rows = (selectedOnly ? items.filter(i => this.selectedRows.has(i.key)) : items)
      .map(item => visibleCols.map(c => '"' + ((item as any)[c.key] || '').replace(/"/g, '""') + '"'));
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fusionops-storage.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  copySelectedToClipboard() {
    const visibleCols = this.columns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const items = this.getFilteredSortedStorage();
    const rows = items.filter(i => this.selectedRows.has(i.key))
      .map(item => visibleCols.map(c => (item as any)[c.key]));
    const text = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(text);
  }
}
