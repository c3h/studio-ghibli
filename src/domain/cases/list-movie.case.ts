import { HttpRequest, HttpResponse } from '../generic';

export interface IListMovieCase {
  movies (request: HttpRequest): Promise<HttpResponse>
}
