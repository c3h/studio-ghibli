import { IMoviesModel } from './movies-model'

export interface Offset {
  offset: number
}

export interface MoviesService {
  get: (offset?: Offset) => Promise<IMoviesModel[]>
}
