import { Movie } from '$/domain';

export interface IBulkAddMovieRepo {
  bulkAddMovie (movies: Movie[]): Promise<void>
}
