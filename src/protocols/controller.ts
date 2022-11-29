import { HttpResponse } from './http'

export interface Controller<T = any> {
  movies: (request: T) => Promise<HttpResponse>
  ghibliApi: () => Promise<HttpResponse>
}
