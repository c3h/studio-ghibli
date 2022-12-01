import { Movie } from '$/domain';
import { MovieRepo } from '$/infra';
import { IListMovieTask, IPopulateMovieTask } from '$/presentation';
import { IBulkAddMovieRepo, IListMovieRepo, IPopulateMovieRepo } from '../repos';

export class MoviesTask implements IListMovieTask, IPopulateMovieTask {
  constructor(
    readonly movieRepo:
      IListMovieRepo &
      IPopulateMovieRepo &
      IBulkAddMovieRepo = new MovieRepo()
  ) {}

  async movies (offset: string = '0'): Promise<Movie[]> {
    const getMovies = await this.movieRepo.movies(offset);
    return getMovies;
  }

  async populateData (): Promise<void> {
    const result = await this.movieRepo.populateMovie();
    await this.movieRepo.bulkAddMovie(result);
  }
}
