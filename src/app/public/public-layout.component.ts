import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'integrationops-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PublicLayoutComponent {
  year = new Date().getFullYear();
}
