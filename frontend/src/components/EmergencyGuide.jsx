const guide = {
  before: ['Prepare a go-bag with water, medicine, flashlight, and documents.', 'Secure heavy furniture and install latches on cabinets.', 'Plan a family emergency meetup location and contacts.'],
  during: ['Drop, Cover, and Hold On.', 'Stay away from windows and heavy objects.', 'If outdoors, move to an open area away from buildings and power lines.'],
  after: ['Check yourself and others for injuries.', 'Expect aftershocks and avoid damaged buildings.', 'Follow official emergency instructions and updates.']
};

export const EmergencyGuide = () => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <h2 className="mb-3 text-lg font-semibold">Emergency Guide</h2>

    <div className="grid gap-3 md:grid-cols-3">
      {Object.entries(guide).map(([phase, items]) => (
        <article key={phase} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
          <h3 className="mb-2 text-base font-semibold capitalize">{phase}</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);
