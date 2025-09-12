import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  template: `
  <div class="bg-paper rounded-card shadow-card p-6 w-[360px] h-[220px] flex flex-col justify-between">
    <div class="flex items-center justify-between opacity-70">
      <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
      <span class="font-semibold tracking-widest">VISA</span>
    </div>
    <div>
      <p class="text-sm uppercase text-ink-dim">Number</p>
      <p class="text-xl font-semibold tracking-[.25em]">**** **** 002 0329</p>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-sm">
        <p class="uppercase">{{ holder }}</p>
      </div>
      <div class="text-right text-sm">
        <p class="uppercase text-ink-dim">End date</p>
        <p class="font-semibold">09/28</p>
      </div>
    </div>
  </div>
  `,
})
export class CreditCardComponent {
  @Input() holder = 'Incentro CX';
}