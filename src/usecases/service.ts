import { IMoviesModel } from './model'

export interface Service {
  get: (offset?: number) => Promise<IMoviesModel[]>
}
