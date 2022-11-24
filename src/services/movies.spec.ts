import { MoviesService } from './movies'

describe('movies service', () => {
  interface SutTypes {
    sut: MoviesService
  }

  const makeSut = (): SutTypes => {
    const sut = new MoviesService()
    return {
      sut
    }
  }

  test('should return an array of objects on success', async () => {
    const { sut } = makeSut()
    const result = await sut.get(1)
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
