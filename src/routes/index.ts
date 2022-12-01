import { Router } from 'express';
import moviesRoutes from './movie.routes';

const apiRoutes = Router();

apiRoutes.use('/movies', moviesRoutes);

export default apiRoutes;
