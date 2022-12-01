import { Request, Response, Router } from 'express';
import { MoviesController } from '../controllers/movies';

const router = Router();
const moviesController = new MoviesController();

router.get('/', async (req: Request, res: Response) => {
  const result = await moviesController.movies(req);
  res.status(result.statusCode).json(result.body);
});

router.get('/:offset', async (req: Request, res: Response) => {
  const result = await moviesController.movies(req);
  res.status(result.statusCode).json(result.body);
});

export default router;
