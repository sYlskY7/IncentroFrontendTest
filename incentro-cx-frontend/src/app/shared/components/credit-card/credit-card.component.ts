import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

// tarjeta de crédito con flip (vuelta) y ocultar el número
@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="relative w-[360px] h-[220px] cursor-pointer card-wrap" (click)="toggleFlip()">
  <div class="card-3d w-full h-full" [style.transform]="isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'">
    
    <!-- Front -->
    <div class="absolute inset-0 bg-paper rounded-card shadow-card p-6 flex flex-col justify-between face">
      <div class="flex items-center justify-between opacity-70">
        <!-- icono contactless -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 7 Q12 12 9 17" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5 Q17 12 12 19" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 3 Q22 12 15 21" />
        </svg>
        <span class="font-semibold tracking-widest">VISA</span>
      </div>

      <!-- Número de tarjeta -->
      <div>
        <p class="text-sm uppercase text-ink-dim">Number</p>
        <p class="text-xl font-semibold tracking-[.25em]">
          {{ showNumber ? displayNumber : maskedNumber }}
        </p>
        <button
          type="button"
          (click)="toggleNumber($event)"
          class="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:opacity-80"
        >
          <ng-container *ngIf="showNumber; else eyeOpen">
            <!-- Ojo cerrado -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1-2.73 2.78-4.94 5-6.42"/><path d="M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/></svg>
            <span>Hide</span>
          </ng-container>
          <ng-template #eyeOpen>
            <!-- Ojo abierto -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Show</span>
          </ng-template>
        </button>
      </div>

      <!-- Titular y fecha -->
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
    <div class="absolute inset-0 rounded-card shadow-card p-6 face bg-[#6366F1] text-gray-900" [style.transform]="'rotateY(180deg)'">
      <div class="w-full h-8 bg-black rounded-sm mb-6"></div>
      <div class="bg-white h-10 rounded-sm flex items-center px-4 justify-end shadow-inner">
        <span class="text-sm font-semibold tracking-widest">CVV {{ cvv }}</span>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
  .card-wrap { perspective: 1000px; }
  .card-3d { position: relative; transition: transform 600ms; transform-style: preserve-3d; }
  .face { backface-visibility: hidden; }
  `]
})
export class CreditCardComponent {
  @Input() holder = 'Incentro CX'     
  @Input() number: string = '0470 0509 9412 7613' 
  @Input() cvv: string = '251'        

  showNumber = false  // Controla visibilidad del número
  isFlipped = false   // Controla el giro de la tarjeta

  // Devuelve el número ocultando dígitos
  get maskedNumber(): string {
    const digits = this.number.replace(/\s+/g, '')
    const last4 = digits.slice(-4)
    return '**** **** **** ' + last4
  }

  // Devuelve el número completo
  get displayNumber(): string {
    return this.number
  }

  // Alterna mostrar/ocultar número
  toggleNumber(event: Event) {
    event.stopPropagation()
    this.showNumber = !this.showNumber
  }

  // Gira la tarjeta
  toggleFlip() {
    this.isFlipped = !this.isFlipped
  }
}