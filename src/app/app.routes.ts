import { FeaturesComponent } from './public/features.component';
import { CoverComponent } from './public/cover.component';
import { ContactComponent } from './public/contact.component';
import { DashboardComponent } from './private/dashboard.component';
import { CarrierProfileComponent } from './private/carrier-profile.component';
import { NotesComponent } from './private/notes.component';
import { SigninComponent } from './public/signin.component';
import { KanbanComponent } from './private/kanban.component';

export const routes = [
  { path: '', component: CoverComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'carrier-profile', component: CarrierProfileComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: 'signin', component: SigninComponent },
];
