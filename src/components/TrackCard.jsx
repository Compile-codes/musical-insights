import { formatDuration } from '../lib/analytics.js';

function Meter({ label, value }) {
  return (
    <div className="meter">
      <span>{label}</span>
      <div className="meter-track" aria-hidden="true">
        <div className="meter-fill" style={{ width: `${value}%` }} />
      </div>
      <strong>{value}</strong>
    </div>
  );
}

export default function TrackCard({ track, isSelected, isFavorite, inPlaylist, onSelect, onToggleFavorite, onTogglePlaylist }) {
  return (
    <article className={`track-card ${isSelected ? 'selected' : ''}`}>
      <button className="album-art" style={{ background: track.color }} onClick={() => onSelect(track.id)} aria-label={`Select ${track.title}`}>
        <span>{track.title.slice(0, 1)}</span>
      </button>

      <div className="track-body">
        <div className="track-title-row">
          <div>
            <h3>{track.title}</h3>
            <p>{track.artist} · {track.album}</p>
          </div>
          <button className="icon-button" onClick={() => onToggleFavorite(track.id)} aria-label="Toggle favorite">
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <div className="chips">
          <span>{track.genre}</span>
          <span>{track.mood}</span>
          <span>{track.bpm} BPM</span>
          <span>{formatDuration(track.duration)}</span>
        </div>

        <div className="meters-grid">
          <Meter label="Energy" value={track.energy} />
          <Meter label="Dance" value={track.danceability} />
          <Meter label="Mood" value={track.valence} />
        </div>

        <div className="card-actions">
          <button className="secondary-button" onClick={() => onSelect(track.id)}>
            Use as seed
          </button>
          <button className={inPlaylist ? 'danger-button' : 'primary-button'} onClick={() => onTogglePlaylist(track.id)}>
            {inPlaylist ? 'Remove' : 'Add to playlist'}
          </button>
        </div>
      </div>
    </article>
  );
}
