import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CarrierProfileComponent } from './carrier-profile.component';
import { NotesComponent } from './notes.component';
import { KanbanComponent } from './kanban.component';
import { SettingsComponent } from './settings.component';
import { PagerDutyEventsComponent } from './pagerduty-events.component';

export const PRIVATE_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'carrier-profile', component: CarrierProfileComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'pagerduty-events', component: PagerDutyEventsComponent }
];