import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './public/features.component';
import { CoverComponent } from './public/cover.component';
import { ContactComponent } from './public/contact.component';
import { DashboardComponent } from './private/dashboard.component';
import { NotesComponent } from './private/notes.component';
import { SigninComponent } from './public/signin.component';

export const routes: Routes = [
  { path: '', component: CoverComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
