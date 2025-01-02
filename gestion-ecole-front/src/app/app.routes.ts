import { Routes } from '@angular/router';
import { ListComponent } from './etudiants/list/list.component';

export const routes: Routes = [
    { path: 'etudiants', component: ListComponent },
    { path: '', redirectTo: 'etudiants', pathMatch: 'full' },
];
