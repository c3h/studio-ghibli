import { MoviesModel } from '../model/movies';
import { IMoviesModel, Model, Service } from '../protocols';

export class MoviesService implements Service {
  constructor(
    readonly moviesModel: Model = new MoviesModel()
  ) {}

  async get (offset: number = 0): Promise<IMoviesModel[]> {
    const getMovies = await this.moviesModel.get(offset);
    return getMovies;
  }

  async getAPI (): Promise<void> {
    const result = await this.moviesModel.getAPI();
    await this.moviesModel.addMovies(result);
  }
}
