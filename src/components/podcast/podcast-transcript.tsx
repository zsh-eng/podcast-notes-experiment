import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Transcription } from '@/lib/transcription';
import { useEffect, useRef } from 'react';

interface PodcastTranscriptProps {
  currentTime: number;
  transcription: Transcription;
}

export function PodcastTranscript({
  currentTime,
  transcription,
}: PodcastTranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Find the currently active segment
  const activeSegment = transcription.segments.find(
    (segment) => currentTime >= segment.start && currentTime <= segment.end
  );

  useEffect(() => {
    if (!activeSegment || !scrollRef.current) return;

    // Find the active segment element
    const activeElement = document.getElementById(
      `segment-${activeSegment.start}`
    );
    if (!activeElement) return;

    // Scroll the active segment into view, centered
    activeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [activeSegment]);

  return (
    <Card className='fixed right-8 top-24 w-96 h-[70vh] bg-background/80 backdrop-blur-lg border'>
      <ScrollArea className='h-full p-6' ref={scrollRef}>
        <div className='space-y-4'>
          {transcription.segments.map((segment) => {
            const isActive = activeSegment?.start === segment.start;

            return (
              <p
                key={segment.start}
                id={`segment-${segment.start}`}
                className={`text-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {segment.text}
              </p>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}
