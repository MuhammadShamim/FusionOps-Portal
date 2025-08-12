import { FeaturesComponent } from './public/features.component';
import { CoverComponent } from './public/cover.component';
import { ContactComponent } from './public/contact.component';
import { DashboardComponent } from './private/dashboard.component';
import { CarrierProfileComponent } from './private/carrier-profile.component';
import { NotesComponent } from './private/notes.component';
import { SigninComponent } from './public/signin.component';
import { KanbanComponent } from './private/kanban.component';
import { SettingsComponent } from './private/settings.component';
import { PagerDutyEventsComponent } from './private/pagerduty-events.component';

export const routes = [
  { path: '', component: CoverComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'carrier-profile', component: CarrierProfileComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [/* add your auth guard here if needed */],
    data: { private: true }
  },
  {
    path: 'pagerduty-events',
    component: PagerDutyEventsComponent,
    data: { private: true }
  },
  {
    path: 'customer',
    loadComponent: () => import('./private/customer.component').then(m => m.CustomerComponent),
    title: 'Customer Lookup'
  },
];
