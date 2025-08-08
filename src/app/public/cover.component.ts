import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicLayoutComponent } from '../shared/public-layout.component';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css'],
  standalone: true,
  imports: [RouterLink, PublicLayoutComponent]
})
export class CoverComponent {}