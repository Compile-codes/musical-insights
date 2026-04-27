import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SearchControls from './components/SearchControls.jsx';
import TrackCard from './components/TrackCard.jsx';
import DashboardStats from './components/DashboardStats.jsx';
import AudioRadar from './components/AudioRadar.jsx';
import RecommendationPanel from './components/RecommendationPanel.jsx';
import PlaylistPanel from './components/PlaylistPanel.jsx';
import MoodExplorer from './components/MoodExplorer.jsx';
import EmptyState from './components/EmptyState.jsx';
import { tracks } from './data/tracks.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const defaultFilters = {
  query: '',
  genre: 'All',
  mood: 'All',
  sortBy: 'match'
};

export default function App() {
  const [selectedTrackId, setSelectedTrackId] = useLocalStorage('sonic:selectedTrackId', tracks[0].id);
  const [favoriteIds, setFavoriteIds] = useLocalStorage('sonic:favorites', []);
  const [playlistIds, setPlaylistIds] = useLocalStorage('sonic:playlist', []);
  const [filters, setFilters] = useState(defaultFilters);

  const selectedTrack = tracks.find((track) => track.id === selectedTrackId) ?? tracks[0];

  const visibleTracks = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    const filtered = tracks.filter((track) => {
      const searchable = `${track.title} ${track.artist} ${track.album} ${track.genre} ${track.mood}`.toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      const matchesGenre = filters.genre === 'All' || track.genre === filters.genre;
      const matchesMood = filters.mood === 'All' || track.mood === filters.mood;
      return matchesQuery && matchesGenre && matchesMood;
    });

    const sorters = {
      popularity: (a, b) => b.popularity - a.popularity,
      energy: (a, b) => b.energy - a.energy,
      danceability: (a, b) => b.danceability - a.danceability,
      year: (a, b) => b.year - a.year,
      match: (a, b) => Number(b.id === selectedTrackId) - Number(a.id === selectedTrackId) || b.popularity - a.popularity
    };

    return [...filtered].sort(sorters[filters.sortBy] ?? sorters.match);
  }, [filters, selectedTrackId]);

  function toggleFavorite(id) {
    setFavoriteIds((current) => current.includes(id) ? current.filter((trackId) => trackId !== id) : [...current, id]);
  }

  function togglePlaylist(id) {
    setPlaylistIds((current) => current.includes(id) ? current.filter((trackId) => trackId !== id) : [...current, id]);
  }

  function handleMoodClick(mood) {
    setFilters((current) => ({ ...current, mood }));
  }

  return (
    <main className="app-shell">
      <Header playlistCount={playlistIds.length} favoritesCount={favoriteIds.length} />

      <section className="hero-card">
        <div className="hero-content">
          <p className="eyebrow">Featured seed track</p>
          <h2>{selectedTrack.title}</h2>
          <p>{selectedTrack.artist} · {selectedTrack.genre} · {selectedTrack.mood}</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => togglePlaylist(selectedTrack.id)}>
              {playlistIds.includes(selectedTrack.id) ? 'Remove from playlist' : 'Add to playlist'}
            </button>
            <button className="secondary-button" onClick={() => toggleFavorite(selectedTrack.id)}>
              {favoriteIds.includes(selectedTrack.id) ? 'Unfavorite' : 'Favorite'}
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          {Array.from({ length: 34 }, (_, index) => (
            <span key={index} style={{ '--height': `${24 + ((index * selectedTrack.energy) % 76)}%`, '--delay': `${index * 0.045}s` }} />
          ))}
        </div>
      </section>

      <DashboardStats tracks={tracks} />

      <div className="content-grid">
        <section className="library-column">
          <SearchControls filters={filters} onFilterChange={setFilters} resultCount={visibleTracks.length} />

          {visibleTracks.length === 0 ? (
            <EmptyState onReset={() => setFilters(defaultFilters)} />
          ) : (
            <div className="track-grid">
              {visibleTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isSelected={selectedTrack.id === track.id}
                  isFavorite={favoriteIds.includes(track.id)}
                  inPlaylist={playlistIds.includes(track.id)}
                  onSelect={setSelectedTrackId}
                  onToggleFavorite={toggleFavorite}
                  onTogglePlaylist={togglePlaylist}
                />
              ))}
            </div>
          )}
        </section>

        <aside className="insight-column">
          <AudioRadar track={selectedTrack} />
          <RecommendationPanel
            tracks={tracks}
            selectedTrackId={selectedTrack.id}
            onSelect={setSelectedTrackId}
            onTogglePlaylist={togglePlaylist}
            playlistIds={playlistIds}
          />
          <PlaylistPanel
            tracks={tracks}
            playlistIds={playlistIds}
            setPlaylistIds={setPlaylistIds}
            selectedTrackId={selectedTrack.id}
          />
          <MoodExplorer tracks={tracks} onMoodClick={handleMoodClick} />
        </aside>
      </div>
    </main>
  );
}
