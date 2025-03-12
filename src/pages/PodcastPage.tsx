import { EpisodeList } from '@/components/podcast/episode-list';
import { PodcastHeader } from '@/components/podcast/podcast-header';
import { PodcastPlayer } from '@/components/podcast/podcast-player';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type PodcastItem } from '@/lib/rss/parse';
import { SAMPLE_PODCAST } from '@/lib/sample/data';
import { useState } from 'react';

export function PodcastPage() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { podcast, episodes } = SAMPLE_PODCAST;

  const [selectedEpisode, setSelectedEpisode] = useState<PodcastItem | null>(
    null
  );

  return (
    <div className='container mx-auto py-8 px-4'>
      <PodcastHeader podcast={podcast} />
      {selectedEpisode && (
        <PodcastPlayer
          audioUrl={selectedEpisode.audio_url ?? ''}
          title={selectedEpisode.title}
          author={podcast.author}
          artworkUrl={selectedEpisode.episode_artwork_url}
        />
      )}

      <div className='mt-8'>
        <Card className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>About this podcast</h2>
          <div className='text-gray-700'>
            {showFullDescription ? (
              <p>{podcast.description}</p>
            ) : (
              <p>
                {podcast.description.slice(0, 300)}
                {podcast.description.length > 300 ? '...' : ''}
              </p>
            )}
          </div>
          {podcast.description.length > 300 && (
            <Button
              variant='link'
              className='p-0 mt-2 h-auto'
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </Button>
          )}
        </Card>
      </div>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Latest Episodes</h2>
        <EpisodeList episodes={episodes} onEpisodeSelect={setSelectedEpisode} />
      </div>
    </div>
  );
}
