import { Component } from '@angular/core';
import { PublicLayoutComponent } from './public-layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PublicLayoutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}