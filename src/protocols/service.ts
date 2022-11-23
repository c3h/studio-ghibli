import { IMoviesModel } from '../usecases/movies-model'

export interface Service {
  handle: (offset?: number) => Promise<IMoviesModel>
}
