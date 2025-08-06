import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf]
})
export class SidebarComponent {
  @Input() isAuthenticated = false;
  @Output() signOut = new EventEmitter<void>();

  onSignOutClick() {
    this.signOut.emit();
  }
}
