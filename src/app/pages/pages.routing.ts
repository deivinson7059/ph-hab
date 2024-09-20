import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ConfigurationAdminComponent } from './configuration-admin/configuration-admin.component';

export const PagesRoutes: Routes = [
  {
    path: 'home',
    title: 'PgFacture® - Dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      info: 'Dashboards',
      rol_path: ['admin'],
      requiredAuth: true,
    },
  },
  {
    path: 'configuration_admin',
    title: 'PgFacture® - Habilitar Empresa',
    component: ConfigurationAdminComponent,
    canActivate: [],
    data: {
      info: 'Habilitar Empresa',
      rol_path: ['admin'],
      requiredAuth: true,
    },
  },
];
