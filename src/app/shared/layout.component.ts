import { Component, Input } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'fusionops-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [SidebarComponent]
})
export class LayoutComponent {
  @Input() title = '';
  year = new Date().getFullYear();
}
