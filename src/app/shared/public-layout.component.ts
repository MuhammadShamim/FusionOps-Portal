import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'fusionops-public-layout',
  standalone: true,
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css'],
  imports: [RouterModule, RouterLink, RouterLinkActive]
})
export class PublicLayoutComponent {
  year = new Date().getFullYear();
}
