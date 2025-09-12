import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenLibraryDoc } from '../../../../core/models/open-library';

@Component({
  selector: 'app-request-api',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-paper rounded-card shadow-card p-6 w-full max-w-md">
    <h3 class="text-lg font-semibold mb-2">Request API (OpenLibrary)</h3>
    <ng-container *ngIf="book as b; else loading">
      <p class="font-medium">{{ b.title }}</p>
      <p class="text-sm text-ink-dim" *ngIf="b.author_name?.length">by {{ b.author_name![0] }}</p>
      <p class="text-xs text-ink-dim mt-2" *ngIf="b.first_publish_year">First published: {{ b.first_publish_year }}</p>
    </ng-container>
    <ng-template #loading>
      <p class="text-sm text-ink-dim">Cargando libro…</p>
    </ng-template>
  </div>
  `,
})
export class RequestApiComponent {
  @Input({ required: true }) book: OpenLibraryDoc | null = null;
}