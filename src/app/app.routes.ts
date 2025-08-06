import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { CoverComponent } from './cover.component';
import { ContactComponent } from './contact.component';
import { DashboardComponent } from './dashboard.component';
import { NotesComponent } from './notes.component';

export const routes: Routes = [
  { path: '', component: CoverComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notes', component: NotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
