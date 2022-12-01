import { Movie } from '$/domain';

export interface Service {
  get: (offset?: string) => Promise<Movie[]>
  getAPI: () => Promise<void>
}
