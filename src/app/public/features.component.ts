import { Component } from '@angular/core';
import { LayoutComponent } from '../shared/layout.component';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  standalone: true,
  imports: [LayoutComponent]
})
export class FeaturesComponent {}