import { Earthquake } from '../models/Earthquake.js';
import { safeFetchJson } from '../utils/http.js';

const normalizeFeature = (feature) => {
  const [lng, lat, depth] = feature.geometry.coordinates;

  return {
    usgsId: feature.id,
    place: feature.properties.place || 'Unknown location',
    magnitude: feature.properties.mag || 0,
    time: new Date(feature.properties.time),
    depth: depth || 0,
    coordinates: {
      type: 'Point',
      coordinates: [lng, lat]
    }
  };
};

export const syncEarthquakesFromUSGS = async () => {
  const endpoint = process.env.USGS_API_URL;
  const payload = await safeFetchJson(endpoint);
  const docs = payload.features.map(normalizeFeature);

  if (!docs.length) {
    return [];
  }

  const bulkOps = docs.map((doc) => ({
    updateOne: {
      filter: { usgsId: doc.usgsId },
      update: { $set: doc },
      upsert: true
    }
  }));

  await Earthquake.bulkWrite(bulkOps);

  return docs;
};
