import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type PodcastFeedResponse } from '@/lib/rss/parse';
import { useState } from 'react';

type PodcastItem = PodcastFeedResponse['episodes'][number];

interface EpisodeListProps {
  episodes: PodcastItem[];
  onEpisodeSelect: (episode: PodcastItem) => void;
}

export function EpisodeList({ episodes, onEpisodeSelect }: EpisodeListProps) {
  return (
    <div className='space-y-4'>
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.guid}
          episode={episode}
          onEpisodeSelect={onEpisodeSelect}
        />
      ))}
    </div>
  );
}

interface EpisodeCardProps {
  episode: PodcastItem;
  onEpisodeSelect: (episode: PodcastItem) => void;
}

function EpisodeCard({ episode, onEpisodeSelect }: EpisodeCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Format the publication date
  const formattedDate = new Date(episode.publication_date).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  // Format the duration
  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Unknown duration';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m ${remainingSeconds}s`;
    }
  };

  // Strip HTML tags from description
  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const cleanDescription = stripHtml(episode.description);

  return (
    <Card className='p-6'>
      <div className='flex flex-col md:flex-row gap-4'>
        {episode.episode_artwork_url ? (
          <div className='flex-shrink-0'>
            <img
              src={episode.episode_artwork_url}
              alt={`${episode.title} artwork`}
              className='w-24 h-24 rounded-md object-cover'
            />
          </div>
        ) : null}

        <div className='flex-1'>
          <h3 className='text-xl font-bold'>{episode.title}</h3>
          <div className='flex items-center gap-2 text-sm text-gray-500 mt-1'>
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{formatDuration(episode.duration)}</span>
          </div>

          <div className='mt-3 text-gray-700'>
            {showFullDescription ? (
              <p>{cleanDescription}</p>
            ) : (
              <p>
                {cleanDescription.slice(0, 200)}
                {cleanDescription.length > 200 ? '...' : ''}
              </p>
            )}
          </div>

          {cleanDescription.length > 200 && (
            <Button
              variant='link'
              className='p-0 mt-1 h-auto'
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </Button>
          )}

          <div className='mt-4 flex gap-2'>
            <Button size='sm' onClick={() => onEpisodeSelect(episode)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mr-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                  clipRule='evenodd'
                />
              </svg>
              Play
            </Button>
            <Button size='sm' variant='outline' asChild>
              <a
                href={episode.audio_url}
                target='_blank'
                rel='noopener noreferrer'
                download
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-2'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                Download
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
