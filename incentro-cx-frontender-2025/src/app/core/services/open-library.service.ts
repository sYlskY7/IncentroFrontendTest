import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OpenLibraryDoc, OpenLibrarySearchResponse } from '../models/open-library';

@Injectable({ providedIn: 'root' })
export class OpenLibraryService {
  private readonly base = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  search(q: string): Observable<OpenLibraryDoc | null> {
    const url = `${this.base}?q=${encodeURIComponent(q)}&limit=5`;
    return this.http.get<OpenLibrarySearchResponse>(url).pipe(
      map(res => res.docs?.[0] ?? null)
    );
  }

  getWork(workKey: string) {
    const url = `https://openlibrary.org${workKey}.json`;
    return this.http.get<any>(url);
  }

  getEditions(workKey: string, limit = 3) {
    const url = `https://openlibrary.org${workKey}/editions.json?limit=${limit}`;
    return this.http.get<any>(url);
  }
}