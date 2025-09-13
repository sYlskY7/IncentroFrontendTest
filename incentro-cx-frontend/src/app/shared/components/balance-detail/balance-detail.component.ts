import { Component, Input } from '@angular/core'
import { DecimalPipe } from '@angular/common'

// muestra el balance y la fecha actual
@Component({
  selector: 'app-balance-detail',
  standalone: true,
  imports: [DecimalPipe],
  template: `
  <div class="bg-paper rounded-card shadow-card p-6 w-full max-w-md">
    <div class="flex flex-col items-center gap-3">
      <!-- avatar -->
      <img src="https://github.com/sYlskY7.png" alt="Profile" class="w-14 h-14 rounded-full object-cover" />
      <div class="text-center">
        <p class="font-semibold">Incentro CX</p>
        <p class="text-xs text-ink-dim">{{ today }}</p>
      </div>
    </div>
    <div class="mt-6 pt-6 border-t text-center">
      <p class="text-xs text-ink-dim">Amount Available</p>
      <p class="text-2xl font-extrabold">$ {{ amount | number:'1.2-2' }}</p>
    </div>
  </div> 
  `,
})
export class BalanceDetailComponent {
  @Input({ required: true }) amount!: number // cantidad mostrada

  // fecha actual formateada
  today: string = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}