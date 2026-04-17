import { Router } from 'express';
import {
  getAlerts,
  getEarthquakes,
  getPrediction
} from '../controllers/earthquakeController.js';

const router = Router();

router.get('/earthquakes', getEarthquakes);
router.get('/alerts', getAlerts);
router.get('/prediction', getPrediction);

export default router;
