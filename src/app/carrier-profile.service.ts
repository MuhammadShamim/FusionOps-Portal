import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarrierProfileService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getCarrierProfile(name: string): Observable<any> {
    const baseUrl = this.env.get('API_BASE_URL');
    const clientId = this.env.get('API_CLIENT_ID');
    const clientSecret = this.env.get('API_CLIENT_SECRET');

    // Check for missing or placeholder credentials/URL
    if (!baseUrl || baseUrl === '/api' || baseUrl.startsWith('http') === false) {
      return of({ error: { status: 'Config', message: 'API_BASE_URL is missing or not set to a valid URL.' } });
    }
    if (!clientId || clientId === 'your_client_id_here') {
      return of({ error: { status: 'Config', message: 'API_CLIENT_ID is missing or not set.' } });
    }
    if (!clientSecret || clientSecret === 'your_client_secret_here') {
      return of({ error: { status: 'Config', message: 'API_CLIENT_SECRET is missing or not set.' } });
    }

    const url = `${baseUrl}/carrierprofile/${encodeURIComponent(name)}`;
    const headers = {
      'client_id': clientId,
      'client_secret': clientSecret,
      'Content-Type': 'text/plain'
    };
    return this.http.get<any>(url, { headers }).pipe(
      catchError(err => {
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
