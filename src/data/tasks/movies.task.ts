import { Movie } from '$/domain';
import { IListMovieTask, IPopulateMovieTask } from '$/presentation/tasks';
import { MoviesModel } from '../../infra/mysql/repos/movies.repo';
import { IBulkAddMovieRepo, IListMovieRepo, IPopulateMovieRepo } from '../repos';

export class MoviesService implements IListMovieTask, IPopulateMovieTask {
  constructor(
    readonly moviesModel:
      IListMovieRepo &
      IPopulateMovieRepo &
      IBulkAddMovieRepo = new MoviesModel()
  ) {}

  async movies (offset: string = '0'): Promise<Movie[]> {
    const getMovies = await this.moviesModel.movies(offset);
    return getMovies;
  }

  async populateData (): Promise<void> {
    const result = await this.moviesModel.populateMovie();
    await this.moviesModel.bulkAddMovie(result);
  }
}
