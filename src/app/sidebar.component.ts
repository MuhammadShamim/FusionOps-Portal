import { Component, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf]
})
export class SidebarComponent implements OnChanges {
  @Input() isAuthenticated = false;
  @Input() onSignIn?: () => void;
  @Input() onSignOut?: () => void;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isAuthenticated']) {
      this.cdr.detectChanges();
    }
  }
}
