import { describe, expect, it } from 'vitest';
import { tracks } from '../data/tracks.js';
import { createSmartPlaylist, getRecommendations, scoreTrackSimilarity } from './recommendation.js';

describe('recommendation engine', () => {
  it('returns recommendations that exclude the seed track', () => {
    const seed = tracks[0];
    const recommendations = getRecommendations(seed.id, tracks, 5);

    expect(recommendations).toHaveLength(5);
    expect(recommendations.some((track) => track.id === seed.id)).toBe(false);
  });

  it('scores identical tracks higher than different tracks', () => {
    const seed = tracks[0];
    const similar = { ...seed, id: 'copy' };
    const different = tracks.find((track) => track.genre === 'Classical');

    expect(scoreTrackSimilarity(seed, similar)).toBeGreaterThan(scoreTrackSimilarity(seed, different));
  });

  it('creates a smart playlist with at least one track', () => {
    const result = createSmartPlaylist({ tracks, mood: 'Focus', targetMinutes: 10, seedTrackId: tracks[0].id });

    expect(result.playlist.length).toBeGreaterThan(0);
    expect(result.totalSeconds).toBeGreaterThan(0);
  });
});
