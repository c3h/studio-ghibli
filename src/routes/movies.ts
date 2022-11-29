import { Router, Request, Response } from 'express'
import { MoviesController } from '../controllers/movies'
import { MoviesModel } from '../model/movies'
import { MoviesService } from '../services/movies'
import 'express-async-errors'

const router = Router()

const moviesModel = new MoviesModel()
const moviesService = new MoviesService(moviesModel)
const moviesController = new MoviesController(moviesService)

router.get('/', async (req: Request, _res: Response) => {
  const res = await moviesController.movies(req)
  return _res.status(res.statusCode).json(res.body)
})

router.get('/:offset', async (req: Request, _res: Response) => {
  const res = await moviesController.movies(req)
  return _res.status(res.statusCode).json(res.body)
})

export default router
