import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../env.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiStatusService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getStatus(): Observable<{ status: 'success' | 'error', message: string }> {
    const baseUrl = this.env.get('API_BASE_URL');
    const clientId = this.env.get('API_CLIENT_ID');
    const clientSecret = this.env.get('API_CLIENT_SECRET');
    const url = `${baseUrl}/statuscheck`;
    const headers = {
      'client_id': clientId,
      'client_secret': clientSecret
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
