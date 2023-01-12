namespace Tmdb {
  export type SearchResult = {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
  }

  export type Movie = {
    id: number
    title: string
    poster_path: string
    release_date: string
  }
}
