import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './auth/auth.component';
import { Page404Component } from './layouts/errors/page404/page404.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: PagesComponent,
    canActivate: [],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((x) => x.PagesModule),
      },
    ],
  },

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((x) => x.AuthModule),
      },
    ],
  },
  {
    path: '**',
    component: Page404Component,
  },
];
