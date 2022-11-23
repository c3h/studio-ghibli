import { InvalidParamError } from '../errors'
import { MoviesController } from './movies'
import { MoviesService, Offset, IMoviesModel } from './movies-protocols'

describe('movies controller', () => {
  const makeMoviesService = (): MoviesService => {
    class MoviesServiceStub implements MoviesService {
      async get (offset?: Offset): Promise<IMoviesModel[]> {
        const fakeAccount = [{
          id: 'valid_id',
          offset: 'valid_offset',
          title: 'valid_title',
          original_title: 'valid_original_title',
          description: 'valid_description',
          release_date: 'valid_release_date',
          pointing: 'valid_pointing'
        }]
        return new Promise(resolve => resolve(fakeAccount))
      }
    }

    return new MoviesServiceStub()
  }

  interface SutTypes {
    sut: MoviesController
    moviesService: MoviesService
  }

  const makeSut = (): SutTypes => {
    const moviesService = makeMoviesService()
    const sut = new MoviesController(moviesService)
    return {
      sut,
      moviesService
    }
  }
  test('should return 400 if invalid params provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: 'a'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('params'))
  })

  test('should return 200 if valid params provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: 1
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([{
      id: 'valid_id',
      offset: 'valid_offset',
      title: 'valid_title',
      original_title: 'valid_original_title',
      description: 'valid_description',
      release_date: 'valid_release_date',
      pointing: 'valid_pointing'
    }])
  })

  test('should return 200 if not params provided', async () => {
    const { sut } = makeSut()
    const httpRequest = { }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([{
      id: 'valid_id',
      offset: 'valid_offset',
      title: 'valid_title',
      original_title: 'valid_original_title',
      description: 'valid_description',
      release_date: 'valid_release_date',
      pointing: 'valid_pointing'
    }])
  })
})
