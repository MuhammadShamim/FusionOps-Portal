import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'fusionops-private-layout',
  standalone: true,
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  imports: [SidebarComponent]
})
export class PrivateLayoutComponent {
  @Input() isAuthenticated = false;
  @Output() signOut = new EventEmitter<void>();
  year = new Date().getFullYear();
  onSignOut() {
    this.signOut.emit();
  }
}
