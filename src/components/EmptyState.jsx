export default function EmptyState({ onReset }) {
  return (
    <div className="empty-state">
      <div>🎧</div>
      <h2>No tracks match your filters</h2>
      <p>Try clearing the search, genre, or mood filters to discover more music.</p>
      <button className="primary-button" onClick={onReset}>Reset filters</button>
    </div>
  );
}
