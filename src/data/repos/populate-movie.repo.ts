import { Movie } from '$/domain';

export interface IPopulateMovieRepo {
  populateMovie (): Promise<Movie[]>
}
