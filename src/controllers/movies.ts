import { InvalidParamError } from '../errors'
import { badRequest, ok } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller } from './movies-protocols'

export class MoviesController implements Controller {
  async handle (request: HttpRequest): Promise<HttpResponse> {
    if (request.params && typeof request.params !== 'number') {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }

    return ok('ok')
  }
}
