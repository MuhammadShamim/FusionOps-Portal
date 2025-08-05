import { Routes } from '@angular/router';
import { TeamComponent } from './team.component';

export const routes: Routes = [
  { path: 'team', component: TeamComponent, loadComponent: () => import('./team.component').then(m => m.TeamComponent) },
];
