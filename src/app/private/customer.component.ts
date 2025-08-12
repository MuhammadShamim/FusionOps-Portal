import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'fusionops-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
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
