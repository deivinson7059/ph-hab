import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const AuthRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    data: { titulo: 'Login' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { requiredAuth: false, titulo: 'Login' },
    canActivate: [],
  },
];
