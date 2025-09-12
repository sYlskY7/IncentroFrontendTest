import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OpenLibraryService } from '../../../../core/services/open-library.service';

// componente de detalle de libro
@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="p-8 max-w-[1200px] mx-auto">
    <a routerLink="/" class="inline-flex items-center gap-2 text-ink-dim hover:opacity-80 mb-6">
      <span class="text-2xl">‹</span>
      <span class="text-xl font-semibold">Back to home</span>
    </a>

    <div *ngIf="loading" class="text-sm text-ink-dim">Loading…</div>
    <div *ngIf="error" class="text-sm text-red-600">{{ error }}</div>

    <ng-container *ngIf="book as b">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-9">
          <div class="flex items-baseline gap-4 flex-wrap">
            <h1 class="text-[26px] font-extrabold">{{ b.title }}</h1>
            <span class="text-amber-500 font-extrabold">( {{ rating }} de 5 )</span>
          </div>

          <p class="text-sm text-ink-dim max-w-[900px] mt-3">
            {{ description || fallbackDescription }}
          </p>

          <h3 class="text-xl font-extrabold mt-8 mb-3">Editions</h3>
          <ul class="list-disc pl-5 space-y-2">
            <li *ngFor="let e of editions">
              <span class="font-semibold">{{ e.title || b.title }}</span>
              <span class="text-sm text-ink-dim" *ngIf="e.publish_date"> {{ e.publish_date }}</span>
              <span class="text-sm text-ink-dim" *ngIf="e.authors?.length"> by {{ e.authors[0]?.name }}</span>
            </li>
          </ul>

          <h3 class="text-xl font-extrabold mt-8 mb-3">Book Detail</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p class="font-extrabold mb-2">El objeto físico</p>
              <p class="text-sm">Formato: <span class="text-ink-dim">{{ details.format || '—' }}</span></p>
              <p class="text-sm">Número de páginas: <span class="text-ink-dim">{{ details.pages || '—' }}</span></p>
              <p class="text-sm">Peso: <span class="text-ink-dim">{{ details.weight || '—' }}</span></p>
            </div>
            <div>
              <p class="font-extrabold mb-2">Edition Identifiers</p>
              <p class="text-sm">Open Library: <span class="text-ink-dim">{{ workId || '—' }}</span></p>
              <p class="text-sm">MISBN: <span class="text-ink-dim">{{ identifiers.misbn || '—' }}</span></p>
              <p class="text-sm">ISBN: <span class="text-ink-dim">{{ identifiers.isbn || '—' }}</span></p>
            </div>
            <div class="md:col-span-2">
              <p class="font-extrabold mb-2">Work Identifiers</p>
              <p class="text-sm">Work ID: <span class="text-ink-dim">{{ workId || '—' }}</span></p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3 flex justify-center items-start">
          <img *ngIf="coverUrl; else noCover"
               [src]="coverUrl"
               class="w-[240px] rounded-2xl border shadow-md"
               alt="Book cover"/>
          <ng-template #noCover>
            <div class="w-[240px] h-[320px] bg-gray-100 rounded-2xl border shadow-md flex items-center justify-center text-ink-dim">
              No cover
            </div>
          </ng-template>
        </div>
      </div>
    </ng-container>
  </div>
  `,
})
export class BookDetailComponent implements OnInit {
  slug = ''              
  book: any = null    
  coverUrl = ''          
  description = ''       
  fallbackDescription = 'No description available'
  editions: any[] = []   
  details = { format: '', pages: '', weight: '' }
  identifiers = { misbn: '', isbn: '' }
  workId = ''            
  rating = '4.5'         
  loading = true
  error = ''

  // inyecta ruta y servicio
  constructor(private route: ActivatedRoute, private ol: OpenLibraryService) {}

  // al iniciar obtiene slug y hace búsqueda
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? ''
    const query = this.slug.replace(/-/g, ' ')
    this.fetch(query)
  }

  // busca libro, descripción, portada y ediciones
  private fetch(q: string) {
    this.loading = true
    this.ol.search(q).subscribe({
      next: (doc) => {
        this.book = doc
        this.loading = false
        if (!doc) { this.error = 'No results'; return }

        if (doc.cover_i) {
          this.coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        }

        const key = (doc as any)?.key
        if (key) {
          this.workId = key.replace('/works/', '')

          this.ol.getWork(key).subscribe((work: any) => {
            const d = work?.description
            this.description = typeof d === 'string' ? d : (d?.value || '')
          })

          this.ol.getEditions(key, 3).subscribe((eds: any) => {
            this.editions = (eds?.entries || []).slice(0, 3)
            const first = this.editions[0] || {}
            this.details.format = first.physical_format || ''
            this.details.pages = String(first.number_of_pages || (doc as any).number_of_pages_median || '')
            this.details.weight = first.weight || ''
            this.identifiers.isbn = (first.isbn_13?.[0] || first.isbn_10?.[0] || (doc as any).isbn?.[0] || '') as string
            this.identifiers.misbn = first.isbn_10?.[0] || ''
          })
        }
      },
      error: () => {
        this.loading = false
        this.error = 'Request failed'
      }
    })
  }
}