export interface OpenLibraryDoc {
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryDoc[];
}