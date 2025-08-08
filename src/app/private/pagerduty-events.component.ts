import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from './private-layout.component';
import { PagerDutyService } from '../services/pagerduty.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pagerduty-events',
  standalone: true,
  templateUrl: './pagerduty-events.component.html',
  styleUrls: ['./pagerduty-events.component.css'],
  imports: [CommonModule, FormsModule, PrivateLayoutComponent]
})
export class PagerDutyEventsComponent implements OnInit {
  areAllRowsSelectedOnPage(): boolean {
    return this.pagedEvents.length > 0 && this.pagedEvents.every((e: any) => this.selectedRows.has(e.id));
  }
  events: any[] = [];
  filteredEvents: any[] = [];
  loading = false;
  error = '';
  search = '';
  sortKeys: { key: string, asc: boolean }[] = [{ key: 'created_at', asc: false }];
  page = 1;
  pageSize = 10;
  columns = [
    { key: 'id', label: 'ID', visible: true },
    { key: 'title', label: 'Title', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'urgency', label: 'Urgency', visible: true },
    { key: 'created_at', label: 'Created At', visible: true },
    { key: 'service', label: 'Service', visible: true }
  ];
  selectedRows: Set<string> = new Set();

  auth$;
  constructor(
    private pagerDuty: PagerDutyService,
  public authService: import('../services/auth.service').AuthService
  ) {
    this.auth$ = this.authService.auth$;
  }

  onSignOut() {
    this.authService.signOut();
    window.location.href = '/';
  }

  ngOnInit() {
    this.loadColumnPrefs();
    this.loadEvents();
  }

  loadColumnPrefs() {
    const saved = localStorage.getItem('pagerduty_events_columns');
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          this.columns = this.columns.map(col => {
            const found = arr.find((c: any) => c.key === col.key);
            return found ? { ...col, visible: found.visible } : col;
          });
        }
      } catch {}
    }
  }

  saveColumnPrefs() {
    localStorage.setItem('pagerduty_events_columns', JSON.stringify(this.columns));
  }

  loadEvents() {
    this.loading = true;
    this.error = '';
    const encrypted = localStorage.getItem('fusionops_secrets');
    let token = '';
    if (encrypted) {
      try {
        const decrypted = atob(encrypted);
        const { pagerDutyToken } = JSON.parse(decrypted);
        token = pagerDutyToken || '';
      } catch {}
    }
    if (!token) {
      this.error = 'PagerDuty API token not found. Please add it in Settings.';
      this.loading = false;
      return;
    }
    this.pagerDuty.getEvents(token).subscribe({
      next: (res: any) => {
        this.events = res.incidents || [];
        this.applyFilters();
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load PagerDuty events.';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = this.events;
    if (this.search.trim()) {
      const s = this.search.toLowerCase();
      filtered = filtered.filter(e =>
        (e.title || '').toLowerCase().includes(s) ||
        (e.status || '').toLowerCase().includes(s) ||
        (e.urgency || '').toLowerCase().includes(s) ||
        (e.service?.summary || '').toLowerCase().includes(s)
      );
    }
    filtered = filtered.sort((a, b) => {
      for (const sort of this.sortKeys) {
        let aVal = sort.key === 'service' ? (a.service?.summary || '') : (a[sort.key] || '');
        let bVal = sort.key === 'service' ? (b.service?.summary || '') : (b[sort.key] || '');
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        if (aVal < bVal) return sort.asc ? -1 : 1;
        if (aVal > bVal) return sort.asc ? 1 : -1;
      }
      return 0;
    });
    this.filteredEvents = filtered;
    this.page = 1;
    this.selectedRows.clear();
  }

  onSearchChange() {
    this.applyFilters();
  }

  sortBy(key: string, event?: MouseEvent) {
    if (event && event.shiftKey) {
      // Multi-column sort
      const idx = this.sortKeys.findIndex(s => s.key === key);
      if (idx > -1) {
        this.sortKeys[idx].asc = !this.sortKeys[idx].asc;
      } else {
        this.sortKeys.push({ key, asc: true });
      }
    } else {
      if (this.sortKeys.length === 1 && this.sortKeys[0].key === key) {
        this.sortKeys[0].asc = !this.sortKeys[0].asc;
      } else {
        this.sortKeys = [{ key, asc: true }];
      }
    }
    this.applyFilters();
  }

  toggleColumn(col: any) {
    col.visible = !col.visible;
    this.saveColumnPrefs();
  }

  get pagedEvents() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredEvents.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredEvents.length / this.pageSize) || 1;
  }

  setPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
  }

  toggleRowSelection(id: string) {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  selectAllOnPage() {
    this.pagedEvents.forEach(e => this.selectedRows.add(e.id));
  }

  clearSelection() {
    this.selectedRows.clear();
  }

  downloadCSV(selectedOnly = false) {
    const visibleCols = this.columns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const rows = (selectedOnly ? this.filteredEvents.filter(e => this.selectedRows.has(e.id)) : this.filteredEvents)
      .map(e => visibleCols.map(c => {
        if (c.key === 'service') return '"' + (e.service?.summary || '').replace(/"/g, '""') + '"';
        if (c.key === 'title') return '"' + (e.title || '').replace(/"/g, '""') + '"';
        return e[c.key];
      }));
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pagerduty-events.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  copySelectedToClipboard() {
    const visibleCols = this.columns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const rows = this.filteredEvents.filter(e => this.selectedRows.has(e.id))
      .map(e => visibleCols.map(c => {
        if (c.key === 'service') return e.service?.summary || '';
        if (c.key === 'title') return e.title || '';
        return e[c.key];
      }));
    const text = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(text);
  }
}
