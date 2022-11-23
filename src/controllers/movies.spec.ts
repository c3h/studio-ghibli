import { MoviesController } from './movies'

describe('movies controller', () => {
  interface SutTypes {
    sut: MoviesController
  }

  const makeSut = (): SutTypes => {
    const sut = new MoviesController()
    return {
      sut
    }
  }
  test('should return 400 if invalid params provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: 'a'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
