import { getMoodDistribution } from '../lib/analytics.js';

export default function MoodExplorer({ tracks, onMoodClick }) {
  const moods = getMoodDistribution(tracks);
  const maxCount = Math.max(...moods.map((item) => item.count), 1);

  return (
    <section className="panel mood-panel">
      <div className="panel-heading">
        <p className="eyebrow">Mood explorer</p>
        <h2>Library mood distribution</h2>
      </div>

      <div className="mood-list">
        {moods.map((item) => (
          <button className="mood-row" key={item.mood} onClick={() => onMoodClick(item.mood)}>
            <span>{item.mood}</span>
            <div className="bar-shell">
              <div className="bar-fill" style={{ width: `${(item.count / maxCount) * 100}%` }} />
            </div>
            <strong>{item.count}</strong>
            <small>Energy {item.avgEnergy}% · Positivity {item.avgValence}%</small>
          </button>
        ))}
      </div>
    </section>
  );
}
