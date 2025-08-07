import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../shared/layout.component';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css'],
  standalone: true,
  imports: [RouterLink, LayoutComponent]
})
export class CoverComponent {}