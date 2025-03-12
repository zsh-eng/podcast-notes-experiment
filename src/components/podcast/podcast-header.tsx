import { type PodcastFeedResponse } from "@/lib/rss/parse";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PodcastFeed = PodcastFeedResponse['podcast'];

interface PodcastHeaderProps {
  podcast: PodcastFeed;
}

export function PodcastHeader({ podcast }: PodcastHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0">
        <Card className="overflow-hidden w-48 h-48 md:w-64 md:h-64">
          <img 
            src={podcast.cover_art_url} 
            alt={`${podcast.title} cover art`}
            className="w-full h-full object-cover"
          />
        </Card>
      </div>
      
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{podcast.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{podcast.author}</p>
          <p className="text-sm text-gray-500 mt-1">Language: {podcast.language}</p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(podcast.feed_last_updated).toLocaleDateString()}
          </p>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play Latest
          </Button>
          <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            Subscribe
          </Button>
          <Button variant="outline" asChild>
            <a href={podcast.website_url} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              Website
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
} 