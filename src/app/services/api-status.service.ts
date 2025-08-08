import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiStatusService {
  constructor(private http: HttpClient) {}

  getStatus(): Observable<{ status: 'success' | 'error', message: string }> {
    let baseUrl: string = '/api';
    let apiId = '';
    let secret = '';
    const encrypted = localStorage.getItem('fusionops_secrets');
    if (encrypted) {
      try {
        const decrypted = atob(encrypted);
        const parsed = JSON.parse(decrypted);
        apiId = parsed.apiId;
        secret = parsed.secret;
        if (parsed.apiBaseUrl && typeof parsed.apiBaseUrl === 'string') {
          baseUrl = parsed.apiBaseUrl;
        }
      } catch {}
    }
    const url = `${baseUrl}/statuscheck`;
    const headers = {
      'client_id': apiId,
      'client_secret': secret
    };
    // Debug logging
    console.log('[ApiStatusService] Status Check:', { url, headers });
    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        console.log('[ApiStatusService] Response:', res);
        if (res && res.success === true && res.status === 200) {
          return { status: 'success' as const, message: 'API is healthy' };
        } else {
          return { status: 'error' as const, message: (res && typeof res.message === 'string') ? res.message : 'Unknown error' };
        }
      }),
      catchError(err => {
        console.log('[ApiStatusService] Error:', err);
        return of({ status: 'error' as const, message: (err?.error && typeof err.error.message === 'string') ? err.error.message : 'API unreachable' });
      })
    );
  }
}
