import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'integrationops-private-layout',
  standalone: true,
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  imports: [CommonModule, RouterModule],
})
export class PrivateLayoutComponent {
  @Input() isAuthenticated = false;
  @Output() signOut = new EventEmitter<void>();
  year = new Date().getFullYear();
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  onSignOut() {
    this.signOut.emit();
  }
}
