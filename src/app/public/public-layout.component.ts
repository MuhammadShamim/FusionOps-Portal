import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fusionops-public-layout',
  standalone: true,
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css'],
  imports: [RouterModule]
})
export class PublicLayoutComponent {
  year = new Date().getFullYear();
}
