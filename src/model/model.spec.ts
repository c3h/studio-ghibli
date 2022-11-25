import { Model } from '../usecases'
import { MoviesModel } from './model'

describe('movies model', () => {
  interface SutTypes {
    sut: Model
  }

  const makeSut = (): SutTypes => {
    const sut = new MoviesModel()
    return {
      sut
    }
  }
  test('should returns Promise<IMoviesModel[]>', async () => {
    const { sut } = makeSut()
    const result = await sut.get()
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
})
