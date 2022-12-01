import { Movie } from '$/domain';

export interface IModel {
  get: (offset: string) => Promise<Movie[]>
  getAPI: () => Promise<Movie[]>
  addMovies: (movies: Movie[]) => Promise<void>
}
