import { BellRing } from 'lucide-react';

export const AlertPanel = ({ alerts }) => (
  <section className="rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-800 dark:bg-rose-950/20">
    <div className="mb-3 flex items-center gap-2">
      <BellRing size={18} className="text-rose-500" />
      <h2 className="text-lg font-semibold">Live Alert Panel</h2>
    </div>

    {alerts.length === 0 ? (
      <p className="text-sm text-slate-500">No high-magnitude events detected.</p>
    ) : (
      <ul className="space-y-2">
        {alerts.slice(0, 8).map((alert) => (
          <li
            key={alert.usgsId}
            className="rounded-md border border-rose-200 p-2 text-sm dark:border-rose-900"
          >
            <strong>M {alert.magnitude.toFixed(1)}</strong> — {alert.place}
          </li>
        ))}
      </ul>
    )}
  </section>
);
