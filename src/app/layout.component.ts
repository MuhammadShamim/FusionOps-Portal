import { Component, Input } from '@angular/core';

@Component({
  selector: 'fusionops-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  @Input() title = '';
  year = new Date().getFullYear();
}
