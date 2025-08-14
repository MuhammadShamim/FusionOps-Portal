import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({ providedIn: 'root' })
export class ApiStatusService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getStatus(): Observable<{ status: 'success' | 'error', message: string }> {
    const baseUrl = this.env.get('API_BASE_URL');
    let apiId = '';
    let secret = '';
    const encrypted = localStorage.getItem('integrationops_secrets');
    if (encrypted) {
      try {
        const decrypted = atob(encrypted);
        const parsed = JSON.parse(decrypted);
        apiId = parsed.apiId;
        secret = parsed.secret;
      } catch {}
    }

    // Check for missing or placeholder credentials/URL
    if (!baseUrl || !(baseUrl === '/api' || baseUrl.startsWith('http://') || baseUrl.startsWith('https://'))) {
      return of({ status: 'error' as const, message: 'API_BASE_URL is missing or not set to a valid URL.' });
    }
    if (!apiId) {
      return of({ status: 'error' as const, message: 'API_CLIENT_ID is missing or not set in Settings.' });
    }
    if (!secret) {
      return of({ status: 'error' as const, message: 'API_CLIENT_SECRET is missing or not set in Settings.' });
    }

    const url = `${baseUrl}/statuscheck`;
    const headers = {
      'client_id': apiId,
      'client_secret': secret
    };
    return this.http.get<any>(url, { headers }).pipe(
      map((res: any) => {
        if (res && (res.success === true || res.status === 200)) {
          return { status: 'success' as const, message: 'API is healthy' };
        } else if (res && typeof res.message === 'string') {
          return { status: 'error' as const, message: res.message };
        } else {
          return { status: 'error' as const, message: 'Unknown error' };
        }
      }),
      catchError((err: any) => {
        let message = '';
        if (err?.error && typeof err.error === 'string' && err.error.trim().startsWith('<!DOCTYPE html')) {
          message = 'Server returned an HTML error page (possible 404 or 500).';
        } else if (err?.error && typeof err.error === 'object') {
          message = err.error.message || JSON.stringify(err.error);
        } else {
          message = err?.message || 'API unreachable';
        }
        return of({ status: 'error' as const, message });
      })
    );
  }
}
