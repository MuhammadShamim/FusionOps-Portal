import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PublicLayoutComponent } from './public-layout.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [FormsModule, PublicLayoutComponent]
})
export class SigninComponent {
  username: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.auth.signIn(this.username, this.password)) {
      this.router.navigate(['/app/dashboard']);
    }
  }
}
