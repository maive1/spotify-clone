import { useEffect, useState } from 'react';
import { Slider } from './Slider';
import { formatTime } from '@/helpers/song-controls';
import type { CurrentMusic } from '@/store/usePlayerStore';

interface SongControlsProps {
  isPlaying: boolean;
  tooglePlay(): void;
  audio: React.RefObject<HTMLAudioElement>;
  currentMusic: CurrentMusic;
}

//TODO: implement the Pause and Play components
export const Pause = ({ className }: { className?: string | undefined }) => {
  return (
    <svg
      className={className}
      role='img'
      height='16'
      width='16'
      aria-hidden='true'
      viewBox='0 0 16 16'
    >
      <path d='M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
    </svg>
  );
};

export const Play = ({ className }: { className?: string | undefined }) => {
  return (
    <svg
      className={className}
      role='img'
      height='16'
      width='16'
      aria-hidden='true'
      viewBox='0 0 16 16'
    >
      <path d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z'></path>
    </svg>
  );
};

export function SongControls({
  isPlaying,
  tooglePlay,
  currentMusic,
  audio,
}: SongControlsProps) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleLoadedMetadata = () => {
    if (audio.current && audio.current.duration)
      setDuration(audio.current.duration);
  };

  const handleTimeUpdate = () => {
    if (!audio.current) return;
    setCurrentTime(audio.current.currentTime);
  };

  useEffect(() => {
    if (!audio.current) return;
    audio.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.current &&
        audio.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  });

  useEffect(() => {
    audio.current &&
      audio.current.addEventListener('loadedmetadata', handleLoadedMetadata);
  }, [currentMusic]);

  const formatTotalDuration = formatTime(duration);
  const formatCurrentTime = formatTime(currentTime);

  return (
    <div className='flex flex-col justify-center w-full'>
      <div className='flex flex-row place-content-center'>
        <button className='bg-white rounded-full p-2' onClick={tooglePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>
      <div className='flex flex-row gap-x-2 items-center justify-around'>
        <span className='flex text-xs opacity-50 align-middle w-12 justify-end'>
          {formatCurrentTime}
        </span>
        <span className='flex text-xs opacity-89  w-full'>
          <Slider
            min={0}
            max={audio.current?.duration ?? 0}
            value={[currentTime]}
            className='w-full'
            onValueChange={value => {
              if (!audio.current) return;
              const [time] = value;
              audio.current.currentTime = time;
            }}
          />
        </span>
        <span className='flex text-xs opacity-50 align-middle w-12'>
          {formatTotalDuration}
        </span>
      </div>
    </div>
  );
}
