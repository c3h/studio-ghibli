import { IMoviesModel, Model, Service } from '../usecases'

export class MoviesService implements Service {
  private readonly getMovies

  constructor (movies: Model) {
    this.getMovies = movies
  }

  async get (offset?: number): Promise<IMoviesModel[]> {
    const getMovies = await this.getMovies.get(offset)
    return getMovies
  }
}
