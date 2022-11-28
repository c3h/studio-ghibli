import { IMoviesModel, Model } from '../usecases'
import { Pool } from 'mysql2/promise'

export class MoviesModel implements Model {
  private readonly connection

  constructor (connection: Pool) {
    this.connection = connection
  }

  async get (offset: number): Promise<IMoviesModel[]> {
    const [rows] = this.connection.execute('SELECT * FROM ghibli.movies ORDER BY original_title ASC LIMIT 20 OFFSET ?', [offset])
    const movies = rows as IMoviesModel[]
    return movies
  }
}
