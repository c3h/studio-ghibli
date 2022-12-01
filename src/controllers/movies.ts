import { InvalidParamError } from '../errors';
import { badRequest, noContent, ok, serverError } from '../helpers/http-helper';
import { MoviesService } from '../services/movies';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Service
} from './movies.protocols';

export class MoviesController implements Controller {
  constructor(
    readonly moviesService: Service = new MoviesService()
  ) {}

  async movies (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (
        request.params.offset &&
        parseInt(
          request.params.offset, 10).toString() !== request.params.offset
      ) {
        return badRequest(new InvalidParamError('params'));
      }
      const getMovies = await this.moviesService.get(
        parseInt((request.params.offset || '').trim(), 10)
      );
      return ok(getMovies);
    } catch (e) {
      return serverError();
    }
  }

  async populateData (): Promise<HttpResponse> {
    try {
      await this.moviesService.getAPI();
      return noContent();
    } catch (e) {
      return serverError();
    }
  }
}
