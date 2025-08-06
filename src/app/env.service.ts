import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EnvService {
  private env: { [key: string]: string } = {};

  constructor() {
    // This is a placeholder. In a real app, you would load this from a secure endpoint or build process.
    this.env = {
      API_BASE_URL: 'API_URL',
      API_CLIENT_ID: 'your_client_id_here',
      API_CLIENT_SECRET: 'your_client_secret_here',
    };
  }

  get(key: string): string {
    return this.env[key];
  }
}
