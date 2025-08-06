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
    const url = `${baseUrl}/carrierprofile/${encodeURIComponent(name)}`;
    const params = {
      client_id: clientId,
      client_secret: clientSecret
    };
    return this.http.get<any>(url, { params }).pipe(
      catchError(err => of({ error: err?.error || 'API unreachable' }))
    );
  }
}
