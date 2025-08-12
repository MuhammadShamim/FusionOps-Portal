import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PrivateLayoutComponent } from './private-layout.component';

@Component({
  selector: 'fusionops-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, PrivateLayoutComponent],
  template: `
    <fusionops-private-layout>
      <div class="card card-body mt-4">
        <h2>Customer Lookup</h2>
        <form (ngSubmit)="fetchCustomerInfo()" class="mb-3 d-flex flex-row gap-2">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Customer Number (e.g. W002449214)"
            [(ngModel)]="customerNumber"
            name="customerNumber"
            required
            (keyup.enter)="fetchCustomerInfo()"
            autocomplete="off"
          />
          <button class="btn btn-primary" type="submit" [disabled]="loading || !customerNumber">
            {{ loading ? 'Loading...' : 'Lookup' }}
          </button>
        </form>
        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
        <div *ngIf="infoHtml && !error" class="customer-info mt-3" [innerHTML]="infoHtml"></div>
      </div>
    </fusionops-private-layout>
  `,
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customerNumber = '';
  loading = false;
  error = '';
  infoHtml = '';

  constructor(private http: HttpClient) {}

  fetchCustomerInfo() {
    this.error = '';
    this.infoHtml = '';
    if (!this.customerNumber) return;
    this.loading = true;
    const url = `/api/speedship/customers/ss.wwex.customer.${this.customerNumber}/info`;
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (html: string) => {
        this.infoHtml = html;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to fetch customer info.';
        this.loading = false;
      }
    });
  }
}
