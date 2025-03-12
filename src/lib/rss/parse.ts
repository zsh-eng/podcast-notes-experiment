import Parser from 'rss-parser';

type RssPodcastFeed = {
  title: string;
  description: string;
  language: string;
  link: string;
  image: {
    url: string;
  };
  'itunes:author': string;
  'itunes:summary': string;
  'itunes:explicit': boolean;
  'itunes:image': string;
  lastBuildDate: string;
};

type RssPodcastItem = {
  title: string;
  guid: string;
  description: string;
  pubDate: string;
  enclosure: {
    url: string;
    length?: string;
    type?: string;
  };
  itunes: {
    duration?: string;
    image?: string;
  };
};

type PodcastFeed = {
  title: string;
  author: string;
  description: string;
  website_url: string;
  language: string;
  cover_art_url: string;
  feed_last_updated: string;
};

type PodcastItem = {
  guid: string;
  title: string;
  description: string;
  publication_date: number;
  duration?: number;
  audio_url?: string;
  audio_size?: number;
  audio_type?: string;
  episode_artwork_url?: string;
};

type PodcastFeedResponse = {
  podcast: PodcastFeed;
  episodes: PodcastItem[];
};

const parser: Parser<RssPodcastFeed, RssPodcastItem> = new Parser({
  customFields: {
    feed: [
      'language',
      'image',
      'itunes:author',
      'itunes:summary',
      'itunes:explicit',
      'itunes:image',
    ],
    item: [
      'guid',
      'description',
      ['content:encoded', 'content-encoded'],
      ['itunes:duration', 'itunes.duration'],
      ['itunes:image', 'itunes.image'],
      ['itunes:episode', 'itunes.episode'],
      ['itunes:season', 'itunes.season'],
    ],
  },
});

// durationg is in the format HH:MM:SS
function parseDuration(duration: string): number | undefined {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return undefined;
  }
  return hours * 3600 + minutes * 60 + seconds;
}

function dateToUnixTimestamp(date: string): number | undefined {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return undefined;
  }
  return parsedDate.getTime();
}

export async function parsePodcastFeed(
  xml: string
): Promise<PodcastFeedResponse> {
  try {
    const feed = await parser.parseString(xml);

    return {
      podcast: {
        title: feed.title,
        author: feed.itunes?.author || '',
        description: feed.description,
        website_url: feed.link,
        language: feed.language,
        cover_art_url: feed.image?.url?.[0] || feed.itunes?.image || '',
        feed_last_updated: feed.lastBuildDate,
      },
      episodes: feed.items.map((item) => ({
        guid: item.guid,
        title: item.title,
        description: item.description,
        publication_date: dateToUnixTimestamp(item.pubDate) || 0,
        duration: item.itunes?.duration
          ? parseDuration(item.itunes.duration)
          : undefined,
        audio_url: item.enclosure?.url,
        audio_size: item.enclosure?.length
          ? parseInt(item.enclosure.length)
          : undefined,
        audio_type: item.enclosure?.type,
        episode_artwork_url: item.itunes?.image,
      })),
    };
  } catch (error) {
    throw new Error(`Failed to parse podcast feed: ${error}`);
  }
}
