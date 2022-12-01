import { Movie } from '$/domain';
import { MoviesModel } from '../model/movies';
import { IModel, Service } from '../protocols';

export class MoviesService implements Service {
  constructor(
    readonly moviesModel: IModel = new MoviesModel()
  ) {}

  async get (offset: string = '0'): Promise<Movie[]> {
    const getMovies = await this.moviesModel.get(offset);
    return getMovies;
  }

  async getAPI (): Promise<void> {
    const result = await this.moviesModel.getAPI();
    await this.moviesModel.addMovies(result);
  }
}
