import { InvalidParamError } from '../errors'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, Service } from './movies-protocols'

export class MoviesController implements Controller {
  private readonly getMovies

  constructor (movies: Service) {
    this.getMovies = movies
  }

  async movies (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (
        request.params.offset &&
        parseInt(request.params.offset, 10).toString() !== request.params.offset) {
        return badRequest(new InvalidParamError('params'))
      }
      const getMovies = await this.getMovies.get(parseInt((request.params.offset || '').trim(), 10))
      return ok(getMovies)
    } catch (e) {
      return serverError()
    }
  }

  async ghibliApi (): Promise<HttpResponse> {
    await this.getMovies.getAPI()
    return ok('success')
  }
}
