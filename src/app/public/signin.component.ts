import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class SigninComponent {
  router = inject(Router);
  auth = inject(AuthService);

  email = 'a@a.com';
  password = 'b';

  onSubmit(event: Event) {
    event.preventDefault();
    // You can add real auth logic here if needed
    this.auth.signIn();
    this.router.navigate(['/dashboard']);
  }
}
