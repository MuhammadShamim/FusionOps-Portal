import { Component } from '@angular/core';
import { PublicLayoutComponent } from './public-layout.component';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  standalone: true,
  imports: [PublicLayoutComponent]
})
export class FeaturesComponent {}