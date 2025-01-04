import { Routes } from '@angular/router';
import { ListComponent } from './etudiants/list/list.component';
import { ListProfesseursComponent } from './professeurs/list/list.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent, // Layout contenant le sidenav et la toolbar
        children: [
          { path: 'etudiants', component: ListComponent },
          { path: 'professeurs', component: ListProfesseursComponent },
          { path: '', redirectTo: '/etudiants', pathMatch: 'full' },
        ],
      },
      { path: '**', redirectTo: '/etudiants' },
];
