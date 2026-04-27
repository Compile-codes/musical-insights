import { formatDuration, formatPlaylistTime } from '../lib/analytics.js';
import { createSmartPlaylist } from '../lib/recommendation.js';

export default function PlaylistPanel({ tracks, playlistIds, setPlaylistIds, selectedTrackId }) {
  const playlistTracks = playlistIds.map((id) => tracks.find((track) => track.id === id)).filter(Boolean);
  const totalSeconds = playlistTracks.reduce((sum, track) => sum + track.duration, 0);

  const generateFocusMix = () => {
    const smart = createSmartPlaylist({ tracks, mood: 'Focus', targetMinutes: 16, seedTrackId: selectedTrackId });
    setPlaylistIds(smart.playlist.map((track) => track.id));
  };

  return (
    <section className="panel playlist-panel">
      <div className="panel-heading split">
        <div>
          <p className="eyebrow">Smart playlist</p>
          <h2>{playlistTracks.length ? `${playlistTracks.length} tracks · ${formatPlaylistTime(totalSeconds)}` : 'No tracks yet'}</h2>
        </div>
        <button className="secondary-button" onClick={generateFocusMix}>Generate focus mix</button>
      </div>

      {playlistTracks.length === 0 ? (
        <p className="muted">Add tracks manually or generate a smart playlist from your current seed track.</p>
      ) : (
        <ol className="playlist-list">
          {playlistTracks.map((track) => (
            <li key={track.id}>
              <span className="song-dot" style={{ background: track.color }} />
              <div>
                <strong>{track.title}</strong>
                <p>{track.artist}</p>
              </div>
              <time>{formatDuration(track.duration)}</time>
              <button onClick={() => setPlaylistIds(playlistIds.filter((id) => id !== track.id))}>×</button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
