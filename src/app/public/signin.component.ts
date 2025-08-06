import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true
})
export class SigninComponent {
  router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();
    localStorage.setItem('fusionops_isAuthenticated', 'true');
    this.router.navigate(['/dashboard']);
  }
}
