import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiStatusService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getStatus(): Observable<{ status: 'success' | 'error', message: string }> {
    const baseUrl = this.env.get('API_BASE_URL');
    const clientId = this.env.get('API_CLIENT_ID');
    const clientSecret = this.env.get('API_CLIENT_SECRET');
    const url = `${baseUrl}/api/statuscheck`;
    const params = {
      client_id: clientId,
      client_secret: clientSecret
    };
    return this.http.get<any>(url, { params }).pipe(
      map(res => {
        if (res && res.status === 'success') {
          return { status: 'success', message: 'API is healthy' };
        } else {
          return { status: 'error', message: res?.message || 'Unknown error' };
        }
      }),
      catchError(err => of({ status: 'error', message: err?.error?.message || 'API unreachable' }))
    );
  }
}
