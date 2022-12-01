import { Movie } from '$/domain';
import { IBulkAddMovieRepo, IListMovieRepo, IPopulateMovieRepo } from '../repos';
import { MoviesService } from './movies.task';

describe('movies service', () => {
  const makeMoviesModel = ():
      IListMovieRepo &
      IPopulateMovieRepo &
      IBulkAddMovieRepo => {
    class MoviesModelStub implements
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

    return new MoviesModelStub();
  };

  interface SutTypes {
    sut: MoviesService
    moviesModelStub: IListMovieRepo & IPopulateMovieRepo & IBulkAddMovieRepo
  }

  const makeSut = (): SutTypes => {
    const moviesModelStub = makeMoviesModel();
    const sut = new MoviesService(moviesModelStub);
    return {
      sut,
      moviesModelStub
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

  test('should call moviesModel', async () => {
    const { sut, moviesModelStub } = makeSut();
    const addSpy = jest.spyOn(moviesModelStub, 'movies');
    await sut.movies();
    expect(addSpy).toHaveBeenCalled();
  });

  test('should call moviesModel with correct value', async () => {
    const { sut, moviesModelStub } = makeSut();
    const addSpy = jest.spyOn(moviesModelStub, 'movies');
    const params = '1';
    await sut.movies(params);
    expect(addSpy).toHaveBeenCalledWith(params);
  });

  test('should call moviesModel.getAPI', async () => {
    const { sut, moviesModelStub } = makeSut();
    const addSpy = jest.spyOn(moviesModelStub, 'populateMovie');
    await sut.populateData();
    expect(addSpy).toHaveBeenCalled();
  });
});
