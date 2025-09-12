import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  template: `
  <div class="relative w-[360px] h-[220px] perspective cursor-pointer" (click)="toggleFlip()">
    <div class="relative w-full h-full transition-transform duration-500" [class.rotate-y-180]="isFlipped">
      <!-- Front -->
      <div class="absolute inset-0 bg-paper rounded-card shadow-card p-6 flex flex-col justify-between backface-hidden">
        <div class="flex items-center justify-between opacity-70">
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <span class="font-semibold tracking-widest">VISA</span>
        </div>
        <div>
          <p class="text-sm uppercase text-ink-dim">Number</p>
          <p class="text-xl font-semibold tracking-[.25em]">
            {{ showNumber ? '1234 5678 9012 3456' : '**** **** **** 3456' }}
          </p>
          <button type="button" (click)="toggleNumber($event)" class="mt-2 text-xs text-blue-500 underline">👁️ Toggle</button>
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
      <!-- Back -->
      <div class="absolute inset-0 bg-gray-800 rounded-card shadow-card p-6 text-white rotate-y-180 backface-hidden">
        <div class="w-full h-8 bg-black mb-6"></div>
        <p class="text-right text-sm">CVV: ***</p>
        <p class="mt-auto text-center text-xs opacity-70">Incentro CX Bank</p>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .perspective { perspective: 1000px; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .backface-hidden { backface-visibility: hidden; transform-style: preserve-3d; }
  `]
})
export class CreditCardComponent {
  @Input() holder = 'Incentro CX';
  showNumber = false;
  isFlipped = false;

  toggleNumber(event: Event) {
    event.stopPropagation();
    this.showNumber = !this.showNumber;
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}