import { Routes } from '@angular/router';
import { RecetaListComponent } from './components/receta-list/receta-list.component';
import { RecetaDetailComponent } from './components/receta-detail/receta-detail.component';
import { RecetaFormComponent } from './components/receta-form/receta-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recetas', pathMatch: 'full' },
  { path: 'recetas', component: RecetaListComponent },
  { path: 'recetas/nueva', component: RecetaFormComponent },
  { path: 'recetas/:id', component: RecetaDetailComponent },
  { path: 'recetas/:id/editar', component: RecetaFormComponent },
  { path: '**', redirectTo: '/recetas' }
];
