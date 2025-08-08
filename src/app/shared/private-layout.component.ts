import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fusionops-private-layout',
  standalone: true,
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  imports: [CommonModule],
})
export class PrivateLayoutComponent {
  @Input() isAuthenticated = false;
  @Output() signOut = new EventEmitter<void>();
  year = new Date().getFullYear();
  onSignOut() {
    this.signOut.emit();
  }
}
