import { Component } from '@angular/core';
import { PublicLayoutComponent } from './public-layout.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [PublicLayoutComponent]
})
export class ContactComponent {}