import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { FastForward, Pause, Play, Rewind } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface PodcastPlayerProps {
  audioUrl: string;
  title: string;
  author: string;
  artworkUrl?: string;
  onTimeUpdate?: (currentTime: number) => void;
}

export function PodcastPlayer({
  audioUrl,
  title,
  author,
  artworkUrl,
  onTimeUpdate,
}: PodcastPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate?.(audio.currentTime);
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onTimeUpdate]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = currentTime + seconds;
  };

  return (
    <Card className='fixed bottom-0 left-0 right-0 p-4 bg-background border-t'>
      <audio ref={audioRef} src={audioUrl} />

      <div className='flex items-center gap-4'>
        {/* Artwork and Info */}
        <div className='flex items-center gap-3 flex-1'>
          {artworkUrl && (
            <img
              src={artworkUrl}
              alt={title}
              className='w-12 h-12 rounded-md'
            />
          )}
          <div>
            <p className='font-medium line-clamp-1'>{title}</p>
            <p className='text-sm text-muted-foreground'>{author}</p>
          </div>
        </div>

        {/* Controls */}
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' onClick={() => handleSkip(-15)}>
            <Rewind className='w-5 h-5' />
          </Button>

          <Button
            variant='outline'
            size='icon'
            className='h-10 w-10'
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className='w-5 h-5' />
            ) : (
              <Play className='w-5 h-5' />
            )}
          </Button>

          <Button variant='ghost' size='icon' onClick={() => handleSkip(30)}>
            <FastForward className='w-5 h-5' />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='mt-4 flex items-center gap-2'>
        <span className='text-sm text-muted-foreground w-12 text-right'>
          {formatTime(currentTime)}
        </span>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          className='flex-1'
        />
        <span className='text-sm text-muted-foreground w-12'>
          {formatTime(duration)}
        </span>
      </div>
    </Card>
  );
}
