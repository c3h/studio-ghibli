import { Movie } from '$/domain';

export interface IListMovieRepo {
  movies (offset: string): Promise<Movie[]>
}
