import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({ providedIn: 'root' })
export class CarrierProfileService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getCarrierProfile(name: string): Observable<any> {
    const baseUrl = this.env.get('API_BASE_URL');
    let apiId = '';
    let secret = '';
    const encrypted = localStorage.getItem('fusionops_secrets');
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
      return of({ error: { status: 'Config', message: 'API_BASE_URL is missing or not set to a valid URL.' } });
    }
    if (!apiId) {
      return of({ error: { status: 'Config', message: 'API_CLIENT_ID is missing or not set in Settings.' } });
    }
    if (!secret) {
      return of({ error: { status: 'Config', message: 'API_CLIENT_SECRET is missing or not set in Settings.' } });
    }

    const url = `${baseUrl}/carrierprofile/${encodeURIComponent(name)}`;
    const headers = {
      'client_id': apiId,
      'client_secret': secret
    };
    // Debug logging
    console.log('[CarrierProfileService] Lookup:', { url, headers, carrierName: name });
    return this.http.get<any>(url, { headers }).pipe(
      catchError((err: any) => {
        let status = err?.status || 'Unknown';
        let message = '';
        if (err?.error && typeof err.error === 'string' && err.error.trim().startsWith('<!DOCTYPE html')) {
          message = 'Server returned an HTML error page (possible 404 or 500).';
        } else if (err?.error && typeof err.error === 'object') {
          message = err.error.message || JSON.stringify(err.error);
        } else {
          message = err?.message || 'API unreachable';
        }
        return of({ error: { status, message } });
      })
    );
  }
}
