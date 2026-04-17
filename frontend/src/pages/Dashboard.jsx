import { useEffect, useMemo } from 'react';
import { AlertPanel } from '../components/AlertPanel';
import { DashboardCards } from '../components/DashboardCards';
import { EmergencyGuide } from '../components/EmergencyGuide';
import { MapView } from '../components/MapView';
import { useQuakeData } from '../hooks/useQuakeData';

export const Dashboard = () => {
  const { earthquakes, alerts, prediction, loading, error } = useQuakeData();

  const newestAlert = useMemo(() => alerts[0], [alerts]);

  useEffect(() => {
    if (!newestAlert || typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification('QuakeGuard Alert', {
        body: `M${newestAlert.magnitude} near ${newestAlert.place}`
      });
    }
  }, [newestAlert]);

  const requestNotifications = async () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  };

  return (
    <main className="mx-auto max-w-7xl space-y-5 p-4">
      <div className="flex items-center justify-end">
        <button
          onClick={requestNotifications}
          className="rounded-lg border border-indigo-400 px-3 py-1 text-sm"
        >
          Enable Browser Alerts
        </button>
      </div>

      {loading ? <p className="animate-pulse">Loading live seismic data...</p> : null}
      {error ? <p className="text-rose-500">{error}</p> : null}

      <DashboardCards
        earthquakes={earthquakes}
        alerts={alerts}
        prediction={prediction}
      />

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <MapView earthquakes={earthquakes} hotZones={prediction?.hotZones || []} />
        <AlertPanel alerts={alerts} />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-lg font-semibold">Recent Earthquakes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="py-2">Time</th>
                <th className="py-2">Location</th>
                <th className="py-2">Magnitude</th>
                <th className="py-2">Depth (km)</th>
              </tr>
            </thead>
            <tbody>
              {earthquakes.slice(0, 12).map((q) => (
                <tr key={q.usgsId} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="py-2">{new Date(q.time).toLocaleString()}</td>
                  <td className="py-2">{q.place}</td>
                  <td className="py-2">{q.magnitude.toFixed(1)}</td>
                  <td className="py-2">{q.depth.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <EmergencyGuide />
    </main>
  );
};
