export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function formatPlaylistTime(seconds) {
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
}

export function averageByFeature(tracks, feature) {
  if (!tracks.length) return 0;
  const total = tracks.reduce((sum, track) => sum + Number(track[feature] ?? 0), 0);
  return Math.round(total / tracks.length);
}

export function groupBy(tracks, key) {
  return tracks.reduce((groups, track) => {
    const value = track[key] ?? 'Unknown';
    groups[value] = groups[value] || [];
    groups[value].push(track);
    return groups;
  }, {});
}

export function getDashboardStats(tracks) {
  return {
    totalTracks: tracks.length,
    avgEnergy: averageByFeature(tracks, 'energy'),
    avgDanceability: averageByFeature(tracks, 'danceability'),
    avgValence: averageByFeature(tracks, 'valence'),
    topGenre: getTopGroup(tracks, 'genre'),
    topMood: getTopGroup(tracks, 'mood')
  };
}

export function getTopGroup(tracks, key) {
  const grouped = groupBy(tracks, key);
  const sorted = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);
  return sorted[0]?.[0] ?? 'None';
}

export function getMoodDistribution(tracks) {
  const grouped = groupBy(tracks, 'mood');
  return Object.entries(grouped)
    .map(([mood, items]) => ({
      mood,
      count: items.length,
      avgEnergy: averageByFeature(items, 'energy'),
      avgValence: averageByFeature(items, 'valence')
    }))
    .sort((a, b) => b.count - a.count);
}
