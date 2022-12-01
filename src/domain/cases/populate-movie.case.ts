import { HttpResponse } from '../generic';

export interface IPopulateMovieCase {
  populateData (): Promise<HttpResponse>
}
