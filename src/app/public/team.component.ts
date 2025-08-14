import { Component } from '@angular/core';
import { PublicLayoutComponent } from './public-layout.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  standalone: true,
  imports: [PublicLayoutComponent]
})
export class TeamComponent {}