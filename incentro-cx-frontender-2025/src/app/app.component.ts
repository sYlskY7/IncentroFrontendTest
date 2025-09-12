import { Component } from '@angular/core';
import { DashboardComponent } from './features/payment/pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  template: `<app-dashboard></app-dashboard>`,
})
export class AppComponent {}