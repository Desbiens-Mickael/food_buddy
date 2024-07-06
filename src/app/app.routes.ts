import { Routes } from '@angular/router';
import { authMerchantGuard } from './core/guards/auth-merchant.guard';
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
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            m => m.RegisterComponent,
          ),
        title: `${titleBase} - Inscription`,
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            m => m.RegisterComponent,
          ),
        title: `${titleBase} - Inscription`,
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./pages/user/map-page/map-page.component').then(
            m => m.MapPageComponent,
          ),
        title: `${titleBase} - Map`,
      },
      {
        path: 'establishments/:id',
        loadComponent: () =>
          import(
            './pages/user/establishment-product/establishment-products/establishment-products.component'
          ).then(m => m.EstablishmentProductsComponent),
        title: `${titleBase} - Produits`,
      },
    ],
  },
  {
    path: 'merchant',
    loadComponent: () =>
      import('./layouts/layout-admin/layout-admin.component').then(
        m => m.LayoutAdminComponent,
      ),
    canActivate: [authMerchantGuard],
    canActivateChild: [authMerchantGuard],
    children: [],
  },
  { path: '**', redirectTo: '' },
];
