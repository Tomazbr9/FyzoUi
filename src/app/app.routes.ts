import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { inject } from '@angular/core/primitives/di';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'

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
        path: '**',
        redirectTo: '/dashboard',
    }
];
