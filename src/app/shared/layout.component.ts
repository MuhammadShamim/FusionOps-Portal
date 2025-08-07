import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'fusionops-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [SidebarComponent]
})
  @Input() title = '';
  @Input() isAuthenticated = false;
  @Output() signOut = new EventEmitter<void>();
  year = new Date().getFullYear();
  onSignOut() {
    this.signOut.emit();
  }
}
