import { getDashboardStats } from '../lib/analytics.js';

export default function DashboardStats({ tracks }) {
  const stats = getDashboardStats(tracks);

  const cards = [
    { label: 'Tracks', value: stats.totalTracks, detail: 'library size' },
    { label: 'Avg energy', value: `${stats.avgEnergy}%`, detail: 'audio intensity' },
    { label: 'Avg dance', value: `${stats.avgDanceability}%`, detail: 'movement score' },
    { label: 'Top mood', value: stats.topMood, detail: `Top genre: ${stats.topGenre}` }
  ];

  return (
    <section className="stats-grid" aria-label="Dashboard statistics">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <p>{card.detail}</p>
        </div>
      ))}
    </section>
  );
}
