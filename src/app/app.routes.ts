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
          import('./pages/public/register/register.component').then(
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
        title: `${titleBase} - Carte des commerçants`,
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import(
            './pages/user/reservations-user/reservations-user.component'
          ).then(m => m.ReservationsUserComponent),
        title: `${titleBase} - Mes repas suspendus`,
      },
      {
        path: 'establishments/:id',
        loadComponent: () =>
          import(
            './pages/user/establishment-product/establishment-products/establishment-products.component'
          ).then(m => m.EstablishmentProductsComponent),
        title: `${titleBase} - Mes produits`,
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/user/profile-user/profile-user.component').then(
            m => m.ProfileUserComponent,
          ),
        title: `${titleBase} - Mon profile`,
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
    children: [
      {
        path: 'establishment/:id/products',
        loadComponent: () =>
          import('./pages/merchant/products-page/products-page.component').then(
            m => m.ProductsPageComponent,
          ),
        title: `${titleBase} - Mes produits`,
      },
      {
        path: 'establishment/:id/new-product',
        loadComponent: () =>
          import(
            './pages/merchant/create-product-page/create-product-page.component'
          ).then(m => m.CreateProductPageComponent),
        title: `${titleBase} - Création de produit`,
      },
      {
        path: 'establishment/:establishmentId/edit-product/:id',
        loadComponent: () =>
          import(
            './pages/merchant/edit-product-page/edit-product-page.component'
          ).then(m => m.EditProductPageComponent),
        title: `${titleBase} - Modification de produit`,
      },
      {
        path: 'establishment/:establishmentId/reservations',
        loadComponent: () =>
          import(
            './pages/merchant/reservations-page/reservations-page.component'
          ).then(m => m.ReservationsPageComponent),
        title: `${titleBase} - Reservations`,
      },
      {
        path: 'account',
        loadComponent: () =>
          import(
            './pages/merchant/account/account-page/account-page.component'
          ).then(m => m.AccountPageComponent),
        title: `${titleBase} - Mon compte`,
      },
      {
        path: 'account/user-settings',
        loadComponent: () =>
          import('./pages/user/profile-user/profile-user.component').then(
            m => m.ProfileUserComponent,
          ),
        title: `${titleBase} - Mon profile`,
      },
      {
        path: 'account/business-settings',
        loadComponent: () =>
          import(
            './pages/merchant/account/business-settings-page/business-settings-page.component'
          ).then(m => m.BusinessSettingsPageComponent),
        title: `${titleBase} - Mon entreprise`,
      },
      {
        path: 'account/establishments-settings',
        loadComponent: () =>
          import(
            './pages/merchant/account/establishements-settings-page/establishements-settings-page.component'
          ).then(m => m.EstablishementsSettingsPageComponent),
        title: `${titleBase} - Mes etablissements`,
      },
      {
        path: 'account/security-settings',
        loadComponent: () =>
          import(
            './pages/merchant/account/security-settings-page/security-settings-page.component'
          ).then(m => m.SecuritySettingsPageComponent),
        title: `${titleBase} - Mes etablissements`,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
