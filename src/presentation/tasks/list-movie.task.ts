import { Movie } from '$/domain';

export interface IListMovieTask {
  movies (offset: string): Promise<Movie[]>
}
