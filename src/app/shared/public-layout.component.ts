import { Component } from '@angular/core';

@Component({
  selector: 'fusionops-public-layout',
  standalone: true,
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css']
})
export class PublicLayoutComponent {
  year = new Date().getFullYear();
}
