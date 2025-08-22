import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { inject } from '@angular/core/primitives/di';
import { LayoutComponent } from './template/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent),
                canActivate: [() => inject(AuthGuard).canActivate()]
            },
            {
                path: 'transactions',
                loadComponent: () => import('./features/transactions/transactions/transactions.component').then(m => m.TransactionsComponent),
                canActivate: [() => inject(AuthGuard).canActivate()]
            },
            {
                path: 'graphics',
                loadComponent: () => import('./features/graphics/graphics/graphics.component').then(m => m.GraphicsComponent),
                canActivate: [() => inject(AuthGuard).canActivate()]
            },
        ],
        canActivate: [() => inject(AuthGuard).canActivate()]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },

    {
        path: '**',
        redirectTo: '/dashboard',
    },
];
