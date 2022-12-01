import { Movie } from '$/domain';
import { IBulkAddMovieRepo, IListMovieRepo, IPopulateMovieRepo } from '../repos';
import { MoviesTask } from './movies.task';

describe('movies task', () => {
  const makeMovieRepo = ():
      IListMovieRepo &
      IPopulateMovieRepo &
      IBulkAddMovieRepo => {
    class MovieRepoStub implements
      IListMovieRepo,
      IPopulateMovieRepo,
      IBulkAddMovieRepo {
      readonly fakeMovies = [{
        id: 'valid_id',
        title: 'valid_title',
        original_title: 'valid_original_title',
        description: 'valid_description',
        release_date: 'valid_release_date',
        rt_score: 'valid_pointing'
      }];

      async movies (offset?: string): Promise<Movie[]> {
        return await new Promise(resolve => resolve(this.fakeMovies));
      }

      async bulkAddMovie(movies: Movie[]): Promise<void> { }

      async populateMovie(): Promise<Movie[]> {
        return await new Promise(resolve => resolve(this.fakeMovies));
      }
    }

    return new MovieRepoStub();
  };

  interface SutTypes {
    sut: MoviesTask
    movieRepoStub: IListMovieRepo & IPopulateMovieRepo & IBulkAddMovieRepo
  }

  const makeSut = (): SutTypes => {
    const movieRepoStub = makeMovieRepo();
    const sut = new MoviesTask(movieRepoStub);
    return {
      sut,
      movieRepoStub
    };
  };

  test('should return an array of objects on success', async () => {
    const { sut } = makeSut();
    const offset = {
      params: '1'
    };
    const result = await sut.movies(offset.params);
    expect(result).toEqual([{
      id: 'valid_id',
      title: 'valid_title',
      original_title: 'valid_original_title',
      description: 'valid_description',
      release_date: 'valid_release_date',
      rt_score: 'valid_pointing'
    }]);
  });

  test('should call movieRepo', async () => {
    const { sut, movieRepoStub } = makeSut();
    const addSpy = jest.spyOn(movieRepoStub, 'movies');
    await sut.movies();
    expect(addSpy).toHaveBeenCalled();
  });

  test('should call movieRepo with correct value', async () => {
    const { sut, movieRepoStub } = makeSut();
    const addSpy = jest.spyOn(movieRepoStub, 'movies');
    const params = '1';
    await sut.movies(params);
    expect(addSpy).toHaveBeenCalledWith(params);
  });

  test('should call movieRepo.getAPI', async () => {
    const { sut, movieRepoStub } = makeSut();
    const addSpy = jest.spyOn(movieRepoStub, 'populateMovie');
    await sut.populateData();
    expect(addSpy).toHaveBeenCalled();
  });
});
