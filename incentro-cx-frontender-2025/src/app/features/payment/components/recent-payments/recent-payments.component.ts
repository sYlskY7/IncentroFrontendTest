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
            <span class="w-2 h-2 rounded-full bg-purple-400"></span>
            <div>
              <p class="font-medium">{{ p.label }}</p>
              <p class="text-xs text-ink-dim">{{ p.type }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-ink-dim">{{ p.date }}</p>
            <p [class.text-red-500]="p.amount<0" [class.text-green-600]="p.amount>0">
              {{ p.amount < 0 ? '-' : '+' }} $ {{ (p.amount < 0 ? -p.amount : p.amount) | number:'1.2-2' }}
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