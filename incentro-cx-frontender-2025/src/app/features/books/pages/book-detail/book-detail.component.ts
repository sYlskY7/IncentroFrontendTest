import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OpenLibraryService } from '../../../../core/services/open-library.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="p-8 max-w-[1200px] mx-auto">
    <a routerLink="/" class="inline-flex items-center gap-2 text-ink-dim hover:opacity-80 mb-6">
      ‹ Back to home
    </a>

    <div *ngIf="loading" class="text-sm text-ink-dim">Loading…</div>
    <div *ngIf="error" class="text-sm text-red-600">{{ error }}</div>

    <ng-container *ngIf="book">
      <h1 class="text-2xl font-extrabold mb-2">{{ book.title }}</h1>
      <p class="text-sm text-ink-dim mb-4" *ngIf="book.author_name?.length">by {{ book.author_name[0] }}</p>
      <p class="text-xs text-ink-dim mb-6" *ngIf="book.first_publish_year">First published: {{ book.first_publish_year }}</p>

      <div *ngIf="coverUrl; else noCover">
        <img [src]="coverUrl" alt="cover" class="w-[240px] rounded shadow-md"/>
      </div>
      <ng-template #noCover>
        <div class="w-[240px] h-[320px] bg-gray-100 flex items-center justify-center rounded shadow-md">
          No cover
        </div>
      </ng-template>

      <p class="mt-6 text-sm max-w-xl" *ngIf="description">{{ description }}</p>
    </ng-container>
  </div>
  `,
})
export class BookDetailComponent implements OnInit {
  slug = '';
  book: any = null;
  coverUrl = '';
  description = '';
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private ol: OpenLibraryService) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const query = this.slug.replace(/-/g, ' ');
    this.fetch(query);
  }

  private fetch(q: string) {
    this.ol.search(q).subscribe({
      next: (doc) => {
        this.book = doc;
        this.loading = false;
        if (doc?.cover_i) {
          this.coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
        }
        if ((doc as any)?.key) {
          this.ol.getWork((doc as any).key).subscribe((work: any) => {
            this.description = typeof work?.description === 'string'
              ? work.description
              : work?.description?.value || '';
          });
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Request failed';
      }
    });
  }
}