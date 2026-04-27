export default function Header({ playlistCount, favoritesCount }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">React Music Intelligence Portfolio Project</p>
        <h1>Sonic Insight</h1>
        <p className="header-copy">
          Discover tracks, compare audio features, build smart playlists, and explain recommendations with transparent scoring.
        </p>
      </div>

      <div className="header-metrics" aria-label="User library summary">
        <div>
          <strong>{playlistCount}</strong>
          <span>Playlist</span>
        </div>
        <div>
          <strong>{favoritesCount}</strong>
          <span>Favorites</span>
        </div>
      </div>
    </header>
  );
}
