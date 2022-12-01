import { MoviesService } from '$/data';
import {
  HttpRequest, HttpResponse, IListMovieCase, IPopulateMovieCase
} from '$/domain';
import { InvalidParamError } from '$/errors';
import { badRequest, noContent, ok, serverError } from '../helpers';
import { IListMovieTask, IPopulateMovieTask } from '../tasks';

export class MoviesController implements IListMovieCase, IPopulateMovieCase {
  constructor(
    readonly moviesService:
      IListMovieTask & IPopulateMovieTask = new MoviesService()
  ) {}

  async movies (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (
        request.params.offset &&
        parseInt(request.params.offset, 10).toString() !== request.params.offset
      ) {
        return badRequest(new InvalidParamError('params'));
      }
      const getMovies = await this.moviesService.movies(request.params.offset);
      return ok(getMovies);
    } catch (e) {
      return serverError();
    }
  }

  async populateData (): Promise<HttpResponse> {
    try {
      await this.moviesService.populateData();
      return noContent();
    } catch (e) {
      return serverError();
    }
  }
}
