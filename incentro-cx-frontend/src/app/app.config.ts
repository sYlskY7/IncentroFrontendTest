import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { DashboardComponent } from './features/payment/pages/dashboard/dashboard.component';
import { BookDetailComponent } from './features/books/pages/book-detail/book-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'book/:slug', component: BookDetailComponent }, 
  { path: '**', redirectTo: '' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
  ],
};