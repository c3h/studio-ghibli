import { IMoviesModel, Model } from '../usecases'
import { MoviesService } from './movies'

describe('movies service', () => {
  const makeMoviesModel = (): Model => {
    class MoviesModelStub implements Model {
      async get (offset?: number): Promise<IMoviesModel[]> {
        const fakeMovies = [{
          id: 'valid_id',
          offset: 'valid_offset',
          title: 'valid_title',
          original_title: 'valid_original_title',
          description: 'valid_description',
          release_date: 'valid_release_date',
          pointing: 'valid_pointing'
        }]
        return new Promise(resolve => resolve(fakeMovies))
      }
    }

    return new MoviesModelStub()
  }

  interface SutTypes {
    sut: MoviesService
    moviesModelStub: Model
  }

  const makeSut = (): SutTypes => {
    const moviesModelStub = makeMoviesModel()
    const sut = new MoviesService(moviesModelStub)
    return {
      sut,
      moviesModelStub
    }
  }

  test('should return an array of objects on success', async () => {
    const { sut } = makeSut()
    const offset = {
      params: 1
    }
    const result = await sut.get(offset.params)
    expect(result).toEqual([{
      id: 'valid_id',
      offset: 'valid_offset',
      title: 'valid_title',
      original_title: 'valid_original_title',
      description: 'valid_description',
      release_date: 'valid_release_date',
      pointing: 'valid_pointing'
    }])
  })

  test('should call moviesModel', async () => {
    const { sut, moviesModelStub } = makeSut()
    const addSpy = jest.spyOn(moviesModelStub, 'get')
    await sut.get()
    expect(addSpy).toHaveBeenCalled()
  })
})
