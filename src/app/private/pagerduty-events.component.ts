import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerDutyService } from './pagerduty.service';

@Component({
  selector: 'app-pagerduty-events',
  standalone: true,
  templateUrl: './pagerduty-events.component.html',
  styleUrls: ['./pagerduty-events.component.css'],
  imports: [CommonModule]
})
export class PagerDutyEventsComponent implements OnInit {
  events: any[] = [];
  loading = false;
  error = '';

  constructor(private pagerDuty: PagerDutyService) {}

  ngOnInit() {
    this.loadEvents();
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
      next: (res) => {
        this.events = res.incidents || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load PagerDuty events.';
        this.loading = false;
      }
    });
  }
}
