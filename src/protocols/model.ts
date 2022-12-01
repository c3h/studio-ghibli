export interface IMoviesModel {
  id: string
  title: string
  original_title: string
  description: string
  release_date: string
  rt_score: string
}

export interface Model {
  get: (offset: string) => Promise<IMoviesModel[]>
  getAPI: () => Promise<IMoviesModel[]>
  addMovies: (movies: IMoviesModel[]) => Promise<void>
}
