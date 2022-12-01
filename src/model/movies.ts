import request from 'request-promise';
import { IMoviesModel, Model } from '../protocols';
import connection from './connection';

export class MoviesModel implements Model {
  private readonly connection;

  constructor () {
    this.connection = connection;
  }

  async get (offset: number): Promise<IMoviesModel[]> {
    const query = `
      SELECT * FROM movies
      ORDER BY original_title ASC
      LIMIT 20 OFFSET ?
    `;
    const [rows] = await this.connection.execute(query, [offset]);
    const movies = rows as IMoviesModel[];
    return movies;
  }

  async addMovies (movies: IMoviesModel[]): Promise<void> {
    const sql = `
      INSERT IGNORE INTO 
      movies (id, title, original_title, description, release_date, rt_score)
      VALUES ?
    `;
    const rows = movies.map((movie) => [
      movie.id,
      movie.title,
      movie.original_title,
      movie.description,
      movie.release_date,
      movie.rt_score
    ]);
    const result = await this.connection.query(sql, [rows]);
    return result;
  }

  async getAPI (): Promise<IMoviesModel[]> {
    const baseURL = process.env.BASE_URL;
    const url = `${baseURL}/films`;
    const result = await request.get(url, { gzip: true });
    const test = JSON.parse(result) as IMoviesModel[];
    return test;
  }
}
