import { Earthquake } from '../models/Earthquake.js';
import { syncEarthquakesFromUSGS } from '../services/earthquakeService.js';
import { calculateRiskScore, inferHotZones } from '../services/predictionService.js';

export const getEarthquakes = async (_req, res) => {
  try {
    await syncEarthquakesFromUSGS();

    const earthquakes = await Earthquake.find().sort({ time: -1 }).limit(200).lean();
    return res.json({ count: earthquakes.length, earthquakes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAlerts = async (req, res) => {
  try {
    await syncEarthquakesFromUSGS();

    const threshold = Number(req.query.threshold || 4.5);
    const alerts = await Earthquake.find({ magnitude: { $gte: threshold } })
      .sort({ time: -1 })
      .limit(100)
      .lean();

    return res.json({ threshold, count: alerts.length, alerts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPrediction = async (_req, res) => {
  try {
    const earthquakes = await Earthquake.find().sort({ time: -1 }).limit(500).lean();

    const input = earthquakes.map((q) => ({
      magnitude: q.magnitude,
      time: q.time,
      coordinates: q.coordinates.coordinates
    }));

    const risk = calculateRiskScore(input);
    const hotZones = inferHotZones(input);

    return res.json({
      generatedAt: new Date().toISOString(),
      risk,
      hotZones
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
