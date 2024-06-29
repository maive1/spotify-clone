import { usePlayerStore } from '@/store/usePlayerStore';
import { useEffect, useRef } from 'react';
import { VolumeControl } from './VolumeControl';
import { CurrentSong } from './CurrentSong';
import { SongControls } from './SongControls';

export function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume, setVolume } =
    usePlayerStore(state => state);
  const { song } = currentMusic;

  const initialVolume = 0.8;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousVolume = useRef<number>(initialVolume);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (song && audioRef.current && song.src) {
      audioRef.current.src = song.src;
      audioRef.current.play();
    }

    () => {
      audioRef.current?.pause();
    };
  }, [currentMusic]);

  const onTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (value: number) => {
    previousVolume.current = volume;
    const volumeValue = value / 100;
    setVolume(volumeValue);
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;

    if (volumeValue === 0) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (volume === 0) {
      audioRef.current.volume = previousVolume.current;
      setVolume(previousVolume.current);
    } else {
      previousVolume.current = volume;
      audioRef.current.volume = 0;
      setVolume(0);
    }
    audioRef.current.muted = !audioRef.current.muted;
  };

  return (
    <div className='flex flex-row justify-around w-full px-4 z-50'>
      <div className='flex-none w-30 basis-1/4 '>
        <CurrentSong {...currentMusic} />
      </div>

      <div className='basis-1/2 grow flex place-content-center gap-4 flex-1 w-full'>
        <SongControls
          isPlaying={isPlaying}
          tooglePlay={onTogglePlay}
          audio={audioRef}
          currentMusic={currentMusic}
        />
      </div>

      <div className='basis-1/4 grid place-content-center'>
        <VolumeControl
          handleVolume={handleVolume}
          toogleMute={toggleMute}
          initialVolume={initialVolume}
        />
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
