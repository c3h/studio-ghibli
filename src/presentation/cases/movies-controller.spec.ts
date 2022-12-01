import { Movie } from '$/domain';
import { InvalidParamError, ServerError } from '$/errors';
import { IListMovieTask, IPopulateMovieTask } from '../tasks';
import { MoviesController } from './movies-controller.case';

describe('movies controller', () => {
  const makeMoviesService = (): IListMovieTask & IPopulateMovieTask => {
    class MoviesServiceStub implements IListMovieTask, IPopulateMovieTask {
      async movies (offset?: string): Promise<Movie[]> {
        const fakeMovies = [{
          id: 'valid_id',
          title: 'valid_title',
          original_title: 'valid_original_title',
          description: 'valid_description',
          release_date: 'valid_release_date',
          rt_score: 'valid_pointing'
        }];
        return await new Promise(resolve => resolve(fakeMovies));
      }

      async populateData (): Promise<void> {}
    }

    return new MoviesServiceStub();
  };

  interface SutTypes {
    sut: MoviesController
    moviesServiceStub: IListMovieTask & IPopulateMovieTask
  }

  const makeSut = (): SutTypes => {
    const moviesServiceStub = makeMoviesService();
    const sut = new MoviesController(moviesServiceStub);
    return {
      sut,
      moviesServiceStub
    };
  };

  test('should return 500 if movies service throws', async () => {
    const { sut, moviesServiceStub } = makeSut();
    jest.spyOn(moviesServiceStub, 'movies').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest = { };
    const httpResponse = await sut.movies(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 400 if invalid params provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        offset: 'a'
      }
    };
    const httpResponse = await sut.movies(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('params'));
  });

  test('should return 200 if valid params provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        offset: '1'
      }
    };
    const httpResponse = await sut.movies(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([{
      id: 'valid_id',
      title: 'valid_title',
      original_title: 'valid_original_title',
      description: 'valid_description',
      release_date: 'valid_release_date',
      rt_score: 'valid_pointing'
    }]);
  });

  test('should return 200 if not params provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {}
    };
    const httpResponse = await sut.movies(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([{
      id: 'valid_id',
      title: 'valid_title',
      original_title: 'valid_original_title',
      description: 'valid_description',
      release_date: 'valid_release_date',
      rt_score: 'valid_pointing'
    }]);
  });

  test('should call Service.get', async () => {
    const { sut, moviesServiceStub } = makeSut();
    const addSpy = jest.spyOn(moviesServiceStub, 'movies');
    const httpRequest = {
      params: {}
    };
    await sut.movies(httpRequest);
    expect(addSpy).toHaveBeenCalled();
  });

  test('should call Service.get with correct value', async () => {
    const { sut, moviesServiceStub } = makeSut();
    const addSpy = jest.spyOn(moviesServiceStub, 'movies');
    const httpRequest = {
      params: {
        offset: '1'
      }
    };
    await sut.movies(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.params.offset);
  });

  test('should return 200 if success data API Ghibli', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.populateData();
    expect(httpResponse.statusCode).toBe(204);
  });

  test('should call Service.getAPI', async () => {
    const { sut, moviesServiceStub } = makeSut();
    const addSpy = jest.spyOn(moviesServiceStub, 'populateData');
    await sut.populateData();
    expect(addSpy).toHaveBeenCalled();
  });

  test('should return 500 if service.getAPI throws', async () => {
    const { sut, moviesServiceStub } = makeSut();
    jest.spyOn(moviesServiceStub, 'populateData').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.populateData();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
