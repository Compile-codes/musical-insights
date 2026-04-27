const FEATURE_RANGES = {
  bpm: 100,
  energy: 100,
  danceability: 100,
  valence: 100,
  acousticness: 100,
  instrumentalness: 100,
  popularity: 100
};

const FEATURE_WEIGHTS = {
  bpm: 0.12,
  energy: 0.2,
  danceability: 0.17,
  valence: 0.16,
  acousticness: 0.12,
  instrumentalness: 0.1,
  popularity: 0.13
};

export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function featureSimilarity(a, b, feature) {
  const range = FEATURE_RANGES[feature] ?? 100;
  const distance = Math.abs((a[feature] ?? 0) - (b[feature] ?? 0));
  return clamp(100 - (distance / range) * 100);
}

export function scoreTrackSimilarity(seedTrack, candidateTrack) {
  if (!seedTrack || !candidateTrack) return 0;

  const audioScore = Object.entries(FEATURE_WEIGHTS).reduce((score, [feature, weight]) => {
    return score + featureSimilarity(seedTrack, candidateTrack, feature) * weight;
  }, 0);

  const genreBoost = seedTrack.genre === candidateTrack.genre ? 8 : 0;
  const moodBoost = seedTrack.mood === candidateTrack.mood ? 10 : 0;
  const freshnessBoost = candidateTrack.year >= 2024 ? 3 : 0;

  return Math.round(clamp(audioScore + genreBoost + moodBoost + freshnessBoost));
}

export function explainRecommendation(seedTrack, candidateTrack) {
  const reasons = [];

  if (seedTrack.genre === candidateTrack.genre) reasons.push(`same genre: ${candidateTrack.genre}`);
  if (seedTrack.mood === candidateTrack.mood) reasons.push(`same mood: ${candidateTrack.mood}`);
  if (Math.abs(seedTrack.bpm - candidateTrack.bpm) <= 12) reasons.push('similar tempo');
  if (Math.abs(seedTrack.energy - candidateTrack.energy) <= 15) reasons.push('similar energy');
  if (Math.abs(seedTrack.valence - candidateTrack.valence) <= 15) reasons.push('similar emotional tone');
  if (candidateTrack.popularity >= 85) reasons.push('strong popularity signal');

  return reasons.slice(0, 3);
}

export function getRecommendations(seedTrackId, allTracks, limit = 5) {
  const seedTrack = allTracks.find((track) => track.id === seedTrackId);
  if (!seedTrack) return [];

  return allTracks
    .filter((track) => track.id !== seedTrackId)
    .map((track) => ({
      ...track,
      matchScore: scoreTrackSimilarity(seedTrack, track),
      reasons: explainRecommendation(seedTrack, track)
    }))
    .sort((a, b) => b.matchScore - a.matchScore || b.popularity - a.popularity)
    .slice(0, limit);
}

export function createSmartPlaylist({ tracks, mood, targetMinutes = 18, seedTrackId }) {
  const maxSeconds = targetMinutes * 60;
  const seed = tracks.find((track) => track.id === seedTrackId);

  const candidates = tracks
    .filter((track) => mood === 'All' || track.mood === mood)
    .map((track) => ({
      ...track,
      playlistScore: seed ? scoreTrackSimilarity(seed, track) : track.popularity + track.energy * 0.2
    }))
    .sort((a, b) => b.playlistScore - a.playlistScore);

  const playlist = [];
  let totalSeconds = 0;

  for (const track of candidates) {
    if (totalSeconds + track.duration <= maxSeconds || playlist.length === 0) {
      playlist.push(track);
      totalSeconds += track.duration;
    }
  }

  return { playlist, totalSeconds };
}
