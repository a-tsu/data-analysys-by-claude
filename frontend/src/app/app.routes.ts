import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'dev',
    loadComponent: () => import('./components/storybook-dev/storybook-dev.component').then(m => m.StorybookDevComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];