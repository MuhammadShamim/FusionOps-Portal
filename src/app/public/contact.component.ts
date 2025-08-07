import { Component } from '@angular/core';
import { LayoutComponent } from '../shared/layout.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [LayoutComponent]
})
export class ContactComponent {}