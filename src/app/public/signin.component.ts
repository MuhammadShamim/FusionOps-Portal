import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true
})
export class SigninComponent {
  router = inject(Router);
  auth = inject(AuthService);

  onSubmit(event: Event) {
    event.preventDefault();
    this.auth.signIn();
    this.router.navigate(['/dashboard']);
  }
}
