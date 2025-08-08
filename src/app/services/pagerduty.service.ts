import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagerDutyService {
  constructor(private http: HttpClient) {}

  getEvents(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token token=${token}`,
      'Accept': 'application/vnd.pagerduty+json;version=2'
    });
    // Example: fetch incidents (events) from PagerDuty
    return this.http.get('/pagerduty/incidents', { headers });
  }
}
