import { MovieCase } from '$/presentation';
import { Request, Response, Router } from 'express';

const populateRoutes = Router();
const movieCase = new MovieCase();

populateRoutes.get('/', async (_req: Request, res: Response) => {
  const result = await movieCase.populateData();
  res.status(result.statusCode).json();
});

export default populateRoutes;
