import { IMoviesModel, Model, Service } from '../protocols'

export class MoviesService implements Service {
  private readonly getMovies

  constructor (movies: Model) {
    this.getMovies = movies
  }

  async get (offset?: number): Promise<IMoviesModel[]> {
    const getMovies = await this.getMovies.get(!offset || offset < 1 ? 1 : offset)
    return getMovies
  }
}
