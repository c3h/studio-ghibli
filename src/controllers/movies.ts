import { InvalidParamError } from '../errors'
import { badRequest, ok } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, MoviesService } from './movies-protocols'

export class MoviesController implements Controller {
  private readonly getMovies

  constructor (movies: MoviesService) {
    this.getMovies = movies
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (request.params && typeof request.params !== 'number') {
      return badRequest(new InvalidParamError('params'))
    }
    const getMovies = await this.getMovies.get(request.params)
    return ok(getMovies)
  }
}
