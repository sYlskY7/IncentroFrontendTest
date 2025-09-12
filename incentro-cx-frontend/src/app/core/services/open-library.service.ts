import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OpenLibraryDoc, OpenLibrarySearchResponse } from '../models/open-library';

@Injectable({ providedIn: 'root' })
export class OpenLibraryService {
  private readonly SEARCH_URL = 'https://openlibrary.org/search.json'; // endpoint base de búsqueda

  constructor(private http: HttpClient) {}

  // busca libros y devuelve el primero que encuentre o null
  search(term: string): Observable<OpenLibraryDoc | null> {
    const q = term?.trim();
    if (!q) return of(null);

    const url = `${this.SEARCH_URL}?q=${encodeURIComponent(q)}&limit=5`;
    return this.http.get<OpenLibrarySearchResponse>(url).pipe(
      map(res => res.docs?.[0] ?? null),
      catchError(() => of(null))
    );
  }

  // devuelve info de un work a partir de su key
  getWork(workKey: string): Observable<any> {
    const url = `https://openlibrary.org${workKey}.json`;
    return this.http.get<any>(url);
  }

  // devuelve las ediciones de un work, por defecto 3
  getEditions(workKey: string, limit = 3): Observable<any> {
    const url = `https://openlibrary.org${workKey}/editions.json?limit=${limit}`;
    return this.http.get<any>(url);
  }
}