import { Routes } from '@angular/router';
import { ListComponent } from './etudiants/list/list.component';
import { ListProfesseursComponent } from './professeurs/list/list.component';

export const routes: Routes = [
    { path: 'etudiants', component: ListComponent },
    { path: 'professeurs', component: ListProfesseursComponent },
    { path: '', redirectTo: '/etudiants', pathMatch: 'full' },
    { path: '**', redirectTo: '/etudiants' }
];
