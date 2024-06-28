import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const titleBase = 'Food buddy';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/layout-base/layout-base.component').then(
        m => m.LayoutBaseComponent,
      ),
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/public/home-page/home-page.component').then(
            m => m.HomePageComponent,
          ),
        title: `${titleBase} - Accueil`,
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/public/login/login.component').then(
            m => m.LoginComponent,
          ),
        title: `${titleBase} - Connexion`,
      },
    ],
  },
  {
    path: 'merchant',
    loadComponent: () =>
      import('./layouts/layout-admin/layout-admin.component').then(
        m => m.LayoutAdminComponent,
      ),
    canActivateChild: [],
    children: [],
  },

  // { path: '**', redirectTo: '' },
];
