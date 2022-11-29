export interface IMoviesModel {
  id: string
  title: string
  original_title: string
  description: string
  release_date: string
  pointing: string
}

export interface Model {
  get: (offset: number) => Promise<IMoviesModel[]>
}
