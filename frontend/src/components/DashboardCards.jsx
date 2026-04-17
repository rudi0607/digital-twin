const cardStyle =
  'rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900';

export const DashboardCards = ({ earthquakes, alerts, prediction }) => {
  const risk = prediction?.risk?.level || 'Low';
  const riskScore = prediction?.risk?.score || 0;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <article className={cardStyle}>
        <p className="text-sm text-slate-500">Recent Events</p>
        <p className="text-3xl font-bold">{earthquakes.length}</p>
      </article>

      <article className={cardStyle}>
        <p className="text-sm text-slate-500">Active Alerts (&gt;=4.5)</p>
        <p className="text-3xl font-bold text-rose-500">{alerts.length}</p>
      </article>

      <article className={cardStyle}>
        <p className="text-sm text-slate-500">Risk Level</p>
        <p className="text-3xl font-bold">{risk}</p>
      </article>

      <article className={cardStyle}>
        <p className="text-sm text-slate-500">Risk Score</p>
        <p className="text-3xl font-bold">{riskScore}</p>
      </article>
    </section>
  );
};
