import { Service } from '../protocols/service'
import { IMoviesModel } from '../usecases'

export class MoviesService implements Service {
  async get (offset?: number): Promise<IMoviesModel[]> {
    return [{
      id: 'valid_id',
      offset: 'valid_offset',
      title: 'valid_title',
      original_title: 'valid_original_title',
      description: 'valid_description',
      release_date: 'valid_release_date',
      pointing: 'valid_pointing'
    }]
  }
}
