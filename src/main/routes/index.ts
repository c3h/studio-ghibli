import { Router } from 'express';
import moviesRoutes from './movie.routes';
import populateRoutes from './populate-movie.routes';

const apiRoutes = Router();

apiRoutes.use('/movies', moviesRoutes);
apiRoutes.use('/populate', populateRoutes);

export default apiRoutes;
