import { Component, Input } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';

export interface PaymentRow {
  label: string;
  type: 'PURCHASE' | 'CREDIT';
  date: string;
  amount: number;
}

@Component({
  selector: 'app-recent-payments',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  template: `
  <div class="mt-8">
    <h3 class="text-lg font-semibold mb-4">Recent Payment</h3>
    <div class="max-h-72 overflow-y-auto pr-2">
      <ul class="divide-y">
        <li *ngFor="let p of payments" class="py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span
              class="w-3 h-3 rounded-full"
              [ngClass]="{
                'bg-purple-400': p.type === 'PURCHASE',
                'bg-indigo-600': p.type === 'CREDIT'
              }"
            ></span>
            <div>
              <p class="font-medium">{{ p.label }}</p>
              <p
                class="text-xs font-semibold uppercase"
                [ngClass]="{
                  'text-orange-500': p.type === 'PURCHASE',
                  'text-indigo-700': p.type === 'CREDIT'
                }"
              >
                {{ p.type }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-ink-dim">{{ p.date }}</p>
            <p
              [class.text-red-500]="p.amount < 0"
              [class.text-green-600]="p.amount > 0"
            >
              {{ p.amount < 0 ? '-' : '+' }} $ {{ (p.amount < 0 ? -p.amount : p.amount) | number: '1.2-2' }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  `,
})
export class RecentPaymentsComponent {
  @Input({ required: true }) payments!: PaymentRow[];
}