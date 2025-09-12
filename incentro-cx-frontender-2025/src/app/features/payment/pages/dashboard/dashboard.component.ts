import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponent } from '../../../../shared/components/credit-card/credit-card.component';
import { BalanceDetailComponent } from '../../../../shared/components/balance-detail/balance-detail.component';
import { RecentPaymentsComponent, PaymentRow } from '../../components/recent-payments/recent-payments.component';
import { RequestApiComponent } from '../../components/request-api/request-api.component';
import { OpenLibraryService } from '../../../../core/services/open-library.service';
import { OpenLibraryDoc } from '../../../../core/models/open-library';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CreditCardComponent,
    BalanceDetailComponent,
    RecentPaymentsComponent,
    RequestApiComponent,
  ],
  template: `
  <div class="p-8 max-w-[1200px] mx-auto">
    <h1 class="text-2xl font-bold mb-6">Payment Dashboard</h1>

    <div class="mb-8">
      <input
        class="w-full md:w-[640px] px-4 py-3 rounded-full bg-white shadow-sm outline-none"
        placeholder="Filter payments by name (optional)" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Columna izquierda -->
      <div class="lg:col-span-7">
        <h2 class="text-xl font-semibold mb-4">Credit Card</h2>
        <app-credit-card [holder]="'Incentro CX'"></app-credit-card>
        <app-recent-payments [payments]="rows"></app-recent-payments>
      </div>

      <!-- Columna derecha -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        <h2 class="text-xl font-semibold">Balance Detail</h2>
        <app-balance-detail [amount]="280"></app-balance-detail>
        <app-request-api [book]="book"></app-request-api>
      </div>
    </div>
  </div>
  `,
})
export class DashboardComponent implements OnInit {
  book: OpenLibraryDoc | null = null;

  rows: PaymentRow[] = [
    { label: 'Pilares de la tierra', type: 'PURCHASE', date: 'Mar 20, 2021', amount: -10 },
    { label: 'The lord of the rings 1', type: 'PURCHASE', date: 'Mar 20, 2021', amount: -10 },
    { label: 'Harry Potter 1', type: 'PURCHASE', date: 'Mar 20, 2021', amount: -10 },
    { label: 'Balance available', type: 'CREDIT', date: 'Mar 20, 2021', amount: +10 },
  ];

  constructor(private ol: OpenLibraryService) {}

  ngOnInit(): void {
    this.ol.search('harry potter').subscribe(b => (this.book = b));
  }
}