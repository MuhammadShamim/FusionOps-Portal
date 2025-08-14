import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SigninComponent } from './signin.component';

export const PUBLIC_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent }
];