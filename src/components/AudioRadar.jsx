const radarFeatures = [
  ['Energy', 'energy'],
  ['Dance', 'danceability'],
  ['Valence', 'valence'],
  ['Acoustic', 'acousticness'],
  ['Instrumental', 'instrumentalness'],
  ['Popularity', 'popularity']
];

function polygonPoints(track, radius, center) {
  return radarFeatures
    .map(([, key], index) => {
      const angle = (Math.PI * 2 * index) / radarFeatures.length - Math.PI / 2;
      const value = track[key] / 100;
      const x = center + Math.cos(angle) * radius * value;
      const y = center + Math.sin(angle) * radius * value;
      return `${x},${y}`;
    })
    .join(' ');
}

export default function AudioRadar({ track }) {
  const center = 96;
  const radius = 74;
  const gridRings = [0.33, 0.66, 1];

  return (
    <section className="panel radar-panel">
      <div className="panel-heading">
        <p className="eyebrow">Audio DNA</p>
        <h2>{track.title}</h2>
      </div>

      <svg className="radar" viewBox="0 0 192 192" role="img" aria-label={`Audio feature radar for ${track.title}`}>
        {gridRings.map((ring) => (
          <polygon
            key={ring}
            className="radar-grid"
            points={radarFeatures
              .map(([, key], index) => {
                const angle = (Math.PI * 2 * index) / radarFeatures.length - Math.PI / 2;
                const x = center + Math.cos(angle) * radius * ring;
                const y = center + Math.sin(angle) * radius * ring;
                return `${x},${y}`;
              })
              .join(' ')}
          />
        ))}

        {radarFeatures.map(([label], index) => {
          const angle = (Math.PI * 2 * index) / radarFeatures.length - Math.PI / 2;
          const x = center + Math.cos(angle) * (radius + 18);
          const y = center + Math.sin(angle) * (radius + 18);
          return (
            <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle">
              {label}
            </text>
          );
        })}

        <polygon className="radar-shape" points={polygonPoints(track, radius, center)} />
      </svg>

      <div className="audio-summary">
        <p>
          This track is strongest in <strong>{strongestFeature(track)}</strong>, with a tempo of <strong>{track.bpm} BPM</strong>.
        </p>
      </div>
    </section>
  );
}

function strongestFeature(track) {
  return radarFeatures
    .map(([label, key]) => [label, track[key]])
    .sort((a, b) => b[1] - a[1])[0][0].toLowerCase();
}
