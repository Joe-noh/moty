export class Movie {
  movie: Tmdb.Movie

  constructor(movie: Tmdb.Movie) {
    this.movie = movie
  }

  public get title(): string {
    return this.movie.title
  }

  public get releaseDate(): Date {
    return new Date(this.movie.release_date)
  }

  public get thumbnailUrl(): string | undefined {
    if (this.movie.poster_path) {
      return `https://image.tmdb.org/t/p/w300${this.movie.poster_path}`
    }
  }
}
