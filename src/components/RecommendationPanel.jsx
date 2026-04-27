import { getRecommendations } from '../lib/recommendation.js';

export default function RecommendationPanel({ tracks, selectedTrackId, onSelect, onTogglePlaylist, playlistIds }) {
  const seedTrack = tracks.find((track) => track.id === selectedTrackId) ?? tracks[0];
  const recommendations = getRecommendations(seedTrack.id, tracks, 4);

  return (
    <section className="panel recommendation-panel">
      <div className="panel-heading split">
        <div>
          <p className="eyebrow">Explainable recommendations</p>
          <h2>Because you selected “{seedTrack.title}”</h2>
        </div>
      </div>

      <div className="recommendation-list">
        {recommendations.map((track) => (
          <article className="recommendation-item" key={track.id}>
            <button className="mini-art" style={{ background: track.color }} onClick={() => onSelect(track.id)}>
              {track.title.slice(0, 1)}
            </button>
            <div>
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
              <div className="reason-list">
                {track.reasons.map((reason) => <span key={reason}>{reason}</span>)}
              </div>
            </div>
            <div className="match-box">
              <strong>{track.matchScore}%</strong>
              <span>match</span>
              <button onClick={() => onTogglePlaylist(track.id)}>
                {playlistIds.includes(track.id) ? 'Added' : 'Add'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
