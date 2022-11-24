import { InvalidParamError, ServerError } from '../errors'
import { MoviesController } from './movies'
import { Service, IMoviesModel } from './movies-protocols'

describe('movies controller', () => {
  const makeMoviesService = (): Service => {
    class MoviesServiceStub implements Service {
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

    return new MoviesServiceStub()
  }

  interface SutTypes {
    sut: MoviesController
    moviesServiceStub: Service
  }

  const makeSut = (): SutTypes => {
    const moviesServiceStub = makeMoviesService()
    const sut = new MoviesController(moviesServiceStub)
    return {
      sut,
      moviesServiceStub
    }
  }

  test('should return 500 if movies service throws', async () => {
    const { sut, moviesServiceStub } = makeSut()
    jest.spyOn(moviesServiceStub, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = { }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

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

  test('should call Service.get', async () => {
    const { sut, moviesServiceStub } = makeSut()
    const addSpy = jest.spyOn(moviesServiceStub, 'get')
    const httpRequest = { }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalled()
  })

  test('should call Service.get with correct value', async () => {
    const { sut, moviesServiceStub } = makeSut()
    const addSpy = jest.spyOn(moviesServiceStub, 'get')
    const httpRequest = { params: 1 }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.params)
  })
})
