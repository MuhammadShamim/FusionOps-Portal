import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.routes')
      .then(m => m.PUBLIC_ROUTES)
  },
  {
    path: 'app',
    loadChildren: () => import('./private/private.routes')
      .then(m => m.PRIVATE_ROUTES),
    canActivate: [AuthGuard],
    data: { private: true }
  }
];
