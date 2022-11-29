import { IMoviesModel, Model } from '../usecases'
import connection from './connection'

export class MoviesModel implements Model {
  private readonly connection

  constructor () {
    this.connection = connection
  }

  async get (offset: number): Promise<IMoviesModel[]> {
    const [rows] = await this.connection.execute('SELECT * FROM db_ghibli.movies ORDER BY original_title ASC LIMIT 20 OFFSET ?', [offset])
    const movies = rows as IMoviesModel[]
    return movies
  }
}
