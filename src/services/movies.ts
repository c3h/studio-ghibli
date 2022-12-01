import { MoviesModel } from '../model/movies';
import { IMoviesModel, Model, Service } from '../protocols';

export class MoviesService implements Service {
  // private readonly getMovies

  // constructor (movies: Model) {
  //   this.getMovies = movies
  // }

  constructor (
    readonly moviesModel: Model = new MoviesModel()
  ) {}

  async get (offset: number = 0): Promise<IMoviesModel[]> {
    const getMovies = await this.moviesModel.get(offset);
    await this.getAPI();
    return getMovies;
  }

  async getAPI (): Promise<void> {
    const result = await this.moviesModel.getAPI();
    console.log('t1');
    await this.moviesModel.addMovies(result);
  }
}
