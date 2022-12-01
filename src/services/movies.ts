import { Movie } from '$/domain';
import { IListMovieTask, IPopulateMovieTask } from '$/presentation/tasks';
import { MoviesModel } from '../model/movies';
import { IModel } from '../protocols';

export class MoviesService implements IListMovieTask, IPopulateMovieTask {
  constructor(
    readonly moviesModel: IModel = new MoviesModel()
  ) {}

  async movies (offset: string = '0'): Promise<Movie[]> {
    const getMovies = await this.moviesModel.get(offset);
    return getMovies;
  }

  async populateData (): Promise<void> {
    const result = await this.moviesModel.getAPI();
    await this.moviesModel.addMovies(result);
  }
}
