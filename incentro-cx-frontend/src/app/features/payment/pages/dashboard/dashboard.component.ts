import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditCardComponent } from '../../../../shared/components/credit-card/credit-card.component';
import { BalanceDetailComponent } from '../../../../shared/components/balance-detail/balance-detail.component';
import { RecentPaymentsComponent, PaymentRow } from '../../components/recent-payments/recent-payments.component';
import { RequestApiComponent } from '../../components/request-api/request-api.component';
import { OpenLibraryService } from '../../../../core/services/open-library.service';
import { OpenLibraryDoc } from '../../../../core/models/open-library';

// Dashboard simple de pagos
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreditCardComponent,
    BalanceDetailComponent,
    RecentPaymentsComponent,
    RequestApiComponent,
  ],
  template: `
  <div class="p-8 max-w-[1200px] mx-auto relative">
    <!-- Avatar superior derecho con preview que muestra la imagen completa -->
    <div class="absolute top-4 right-4 group">
      <img
        src="https://github.com/sYlskY7.png"
        alt="Profile"
        class="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow cursor-pointer"
      />

      <div class="absolute right-0 mt-2 z-50 hidden group-hover:block">
        <div class="w-56 aspect-square p-2 bg-white rounded-xl shadow-2xl ring-1 ring-black/10">
          <img
            src="https://github.com/sYlskY7.png"
            alt="Profile Large"
            class="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>
    </div>

    <h1 class="text-2xl font-bold mb-6">Payment Dashboard</h1>

    <!-- Filtro de pagos recientes -->
    <div class="mb-8 relative w-full md:w-[640px]">
      <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </span>
      <input
        [(ngModel)]="query"
        class="w-full pl-10 pr-4 py-3 rounded-full bg-white shadow-sm outline-none"
        placeholder="Filter payments by name"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!--Tarjeta + pagos -->
      <div class="lg:col-span-7">
        <h2 class="text-xl font-semibold mb-4">Credit Card</h2>
        <app-credit-card [holder]="'Incentro CX'"></app-credit-card>
        <app-recent-payments [payments]="filtered"></app-recent-payments>
      </div>

      <!--Balance detail + request api -->
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
  book: OpenLibraryDoc | null = null; // Libro mostrado en Request API

  // Datos de ejemplo
  rows: PaymentRow[] = [
    { label: 'Pilares de la tierra',       type: 'PURCHASE', date: 'Mar 20, 2021', amount: -10 },
    { label: 'The lord of the rings 1',    type: 'PURCHASE', date: 'Mar 20, 2021', amount: -10 },
    { label: 'Harry Potter 1',             type: 'PURCHASE', date: 'Mar 20, 2021', amount: -10 },
    { label: 'Balance available',          type: 'CREDIT',   date: 'Mar 20, 2021', amount: +10 },
  ];

  query = ''; // Texto del filtro

  // Devuelve pagos filtrados por label
  get filtered(): PaymentRow[] {
    const q = this.query.trim().toLowerCase();
    return q ? this.rows.filter(r => r.label.toLowerCase().includes(q)) : this.rows;
  }

  // Inyecta servicio
  constructor(private ol: OpenLibraryService) {}

  // Carga un libro por defecto
  ngOnInit(): void {
    this.ol.search('harry potter').subscribe(doc => this.book = doc);
  }
}