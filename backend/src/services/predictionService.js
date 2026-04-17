/**
 * Simple risk model for demo and educational use.
 * Inputs: earthquake list (mag, location clusters, recency)
 * Output: normalized risk score in range 0 - 100
 */
export const calculateRiskScore = (earthquakes = []) => {
  if (earthquakes.length === 0) {
    return {
      score: 12,
      level: 'Low',
      explanation: 'Very little recent seismic activity.'
    };
  }

  const highMagnitudeCount = earthquakes.filter((q) => q.magnitude >= 4.5).length;
  const avgMagnitude =
    earthquakes.reduce((sum, q) => sum + q.magnitude, 0) / earthquakes.length;

  const recentWindowMs = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const recentCount = earthquakes.filter(
    (q) => now - new Date(q.time).getTime() <= recentWindowMs
  ).length;

  let score = avgMagnitude * 12 + highMagnitudeCount * 6 + recentCount * 2;
  score = Math.max(0, Math.min(100, Number(score.toFixed(2))));

  let level = 'Low';
  if (score >= 70) level = 'High';
  else if (score >= 40) level = 'Medium';

  const explanation = `Based on ${earthquakes.length} events, avg magnitude ${avgMagnitude.toFixed(
    2
  )}, and ${recentCount} events in last 24h.`;

  return { score, level, explanation };
};

export const inferHotZones = (earthquakes = []) => {
  const bins = new Map();

  earthquakes.forEach((q) => {
    const [lng, lat] = q.coordinates;
    const latBin = Math.round(lat * 2) / 2;
    const lngBin = Math.round(lng * 2) / 2;
    const key = `${latBin},${lngBin}`;

    if (!bins.has(key)) {
      bins.set(key, {
        key,
        lat: latBin,
        lng: lngBin,
        totalMagnitude: 0,
        count: 0
      });
    }

    const row = bins.get(key);
    row.totalMagnitude += q.magnitude;
    row.count += 1;
  });

  return [...bins.values()]
    .map((z) => ({
      ...z,
      intensity: Number((z.totalMagnitude / z.count).toFixed(2))
    }))
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 8);
};
