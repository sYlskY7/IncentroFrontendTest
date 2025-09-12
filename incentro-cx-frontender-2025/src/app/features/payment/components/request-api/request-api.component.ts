import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenLibraryDoc } from '../../../../core/models/open-library';
import { OpenLibraryService } from '../../../../core/services/open-library.service';

@Component({
  selector: 'app-request-api',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="bg-white rounded-card shadow-card p-8 w-full max-w-md border border-gray-200">
    <h3 class="text-2xl font-extrabold text-black mb-8">Search and add a new book</h3>

    <div class="mb-8">
      <input
        type="text"
        [(ngModel)]="q"
        class="w-full px-5 py-3 rounded-full border border-gray-300 outline-none placeholder-gray-400"
        placeholder="Search to add a book...."
        (keyup.enter)="onSearch()"
      />
    </div>

    <button type="button" (click)="onSearch()" class="w-full py-4 rounded-full bg-[#6366F1] text-white font-extrabold text-lg">
      Add a new book
    </button>

    <!-- Result block -->
    <div class="mt-6 text-sm" *ngIf="loading">Searching…</div>
    <div class="mt-6 text-sm text-red-600" *ngIf="error">{{ error }}</div>
    <div class="mt-6" *ngIf="(result || book) as b">
      <button type="button" (click)="openDetail(b)" class="w-full text-left p-3 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200">
        <p class="font-medium">{{ b.title }}</p>
        <p class="text-sm text-ink-dim" *ngIf="b.author_name && b.author_name.length > 0">by {{ b.author_name![0] }}</p>
        <p class="text-xs text-ink-dim mt-1" *ngIf="b.first_publish_year">First published: {{ b.first_publish_year }}</p>
      </button>
    </div>
  </div>
  `,
})
export class RequestApiComponent {
  @Input({ required: true }) book: OpenLibraryDoc | null = null;

  q = '';
  result: OpenLibraryDoc | null = null;
  loading = false;
  error = '';

  constructor(private ol: OpenLibraryService) {}

  onSearch() {
    const term = this.q.trim();
    if (!term) {
      this.error = 'Type a book or author to search';
      this.result = null;
      return;
    }
    this.error = '';
    this.loading = true;
    this.ol.search(term).subscribe({
      next: (doc) => {
        this.result = doc;
        this.loading = false;
        if (!doc) this.error = 'No results';
      },
      error: () => {
        this.loading = false;
        this.error = 'Request failed, try again';
      }
    });
  }

  private slugify(v: string) {
    return v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  openDetail(doc: OpenLibraryDoc) {
    const slug = this.slugify(doc.title);
    window.open(`/${slug}`, '_blank');
  }
}