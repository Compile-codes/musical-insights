import { genres, moods } from '../data/tracks.js';

export default function SearchControls({ filters, onFilterChange, resultCount }) {
  const update = (key, value) => onFilterChange({ ...filters, [key]: value });

  return (
    <section className="controls-card" aria-label="Search and filter tracks">
      <div className="search-box">
        <label htmlFor="search">Search music</label>
        <input
          id="search"
          type="search"
          value={filters.query}
          onChange={(event) => update('query', event.target.value)}
          placeholder="Search title, artist, album, genre..."
        />
      </div>

      <div className="filter-grid">
        <label>
          Genre
          <select value={filters.genre} onChange={(event) => update('genre', event.target.value)}>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </label>

        <label>
          Mood
          <select value={filters.mood} onChange={(event) => update('mood', event.target.value)}>
            {moods.map((mood) => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select value={filters.sortBy} onChange={(event) => update('sortBy', event.target.value)}>
            <option value="match">Best match</option>
            <option value="popularity">Popularity</option>
            <option value="energy">Energy</option>
            <option value="danceability">Danceability</option>
            <option value="year">Newest</option>
          </select>
        </label>
      </div>

      <p className="result-count">{resultCount} tracks found</p>
    </section>
  );
}
