import { InvalidParamError } from '../errors'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller } from './movies-protocols'

export class MoviesController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (request.params && request.params !== Number) {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }
  }
}
