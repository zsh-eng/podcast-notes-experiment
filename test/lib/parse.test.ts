import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { parsePodcastFeed } from '../../src/lib/rss/parse';

describe('parsePodcastFeed', () => {
  it('should parse a podcast RSS feed', async () => {
    const xml = readFileSync(join(__dirname, '../data/response.xml'), 'utf-8');

    const result = await parsePodcastFeed(xml);

    expect(result).toHaveProperty('podcast');
    expect(result).toHaveProperty('episodes');

    expect(result.podcast).toHaveProperty('title');
    expect(result.podcast).toHaveProperty('author');
    expect(result.podcast).toHaveProperty('description');
    expect(result.podcast).toHaveProperty('website_url');
    expect(result.podcast).toHaveProperty('language');
    expect(result.podcast).toHaveProperty('cover_art_url');
    expect(result.podcast).toHaveProperty('feed_last_updated');

    expect(result.episodes).toBeInstanceOf(Array);
    if (result.episodes.length > 0) {
      const episode = result.episodes[0];
      expect(episode).toHaveProperty('guid');
      expect(episode).toHaveProperty('title');
      expect(episode).toHaveProperty('description');
      expect(episode).toHaveProperty('publication_date');
      expect(episode).toHaveProperty('audio_url');
    }
  });

  it('should parse podcast and episode details correctly', async () => {
    const xml = readFileSync(join(__dirname, '../data/response.xml'), 'utf-8');
    const result = await parsePodcastFeed(xml);

    // Check podcast details
    expect(result.podcast.title).toBe('The Ezra Klein Show');
    expect(result.podcast.author).toBe('New York Times Opinion');
    expect(result.podcast.description).toBeTypeOf('string');
    expect(result.podcast.website_url).toBe(
      'https://www.nytimes.com/ezra-klein-podcast'
    );
    expect(result.podcast.language).toBe('en');
    expect(result.podcast.cover_art_url).toBeTypeOf('string');
    expect(result.podcast.feed_last_updated).toBe(
      'Sun, 9 Mar 2025 06:00:19 +0000'
    );

    // Check first episode details
    const firstEpisode = result.episodes[0];
    expect(firstEpisode.audio_size).toBe(16322317);
    expect(firstEpisode.audio_type).toBe('audio/mpeg');
    expect(firstEpisode.audio_url).toBeTypeOf('string');
    expect(firstEpisode.description).toBeTypeOf('string');
    expect(firstEpisode.duration).toBe(1020);
    expect(firstEpisode.episode_artwork_url).toBeUndefined();
    expect(firstEpisode.guid).toBe('9f846cd6-6be5-44ac-93e1-8f9059e6e86d');
    expect(firstEpisode.publication_date).toBe(1741500000000);
    expect(firstEpisode.title).toBe('There Is a Liberal Answer to Elon Musk');
  });
});
