import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnvService {
  private env: { [key: string]: string } = {};

  constructor() {
    this.env = {
      API_BASE_URL: '/api',
      MULESOFT_API_URL: 'http://localhost:8081/api',
      MULESOFT_CLIENT_ID: 'your_client_id_here',
      MULESOFT_CLIENT_SECRET: 'your_client_secret_here',
    };
  }

  get(key: string): string {
    return this.env[key];
  }

  getMulesoftConfig() {
    return {
      baseUrl: this.env['MULESOFT_API_URL'],
      clientId: this.env['MULESOFT_CLIENT_ID'],
      clientSecret: this.env['MULESOFT_CLIENT_SECRET']
    };
  }
}