import { IMoviesModel } from '../usecases/movies-model'

export interface Service {
  get: (offset?: number) => Promise<IMoviesModel[]>
}
