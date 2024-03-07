import { Routes } from '@angular/router';

import { TodosPageComponent } from './pages/todos-page/todos-page.component';

export const routes: Routes = [
  { path: 'todos/:status', component: TodosPageComponent },
  { path: '**', redirectTo: '/todos/all', pathMatch: 'full' },
];
