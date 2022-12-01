import { Request, Response, Router } from 'express';
import { MoviesController } from '../../presentation/cases/movies-controller.case';

const moviesRoutes = Router();
const moviesController = new MoviesController();

moviesRoutes.get('/', async (req: Request, res: Response) => {
  const result = await moviesController.movies(req);
  res.status(result.statusCode).json(result.body);
});

moviesRoutes.get('/:offset', async (req: Request, res: Response) => {
  const result = await moviesController.movies(req);
  res.status(result.statusCode).json(result.body);
});

export default moviesRoutes;
