import { IMoviesModel } from './model';

export interface Service {
  get: (offset?: string) => Promise<IMoviesModel[]>
  getAPI: () => Promise<void>
}
