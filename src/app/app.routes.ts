import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'

    },
    {
        path: 'auth',
        loadComponent: () => import('./features/auth/auth/auth.component').then(m => m.AuthComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'transactions',
        loadComponent: () => import('./features/transactions/transactions/transactions.component').then(m => m.TransactionsComponent)
    },
    {
        path: '**',
        redirectTo: '/dashboard',
    }
];
