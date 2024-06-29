import type { Song } from '@/lib/data';

export function formatTime(seconds: number | undefined) {
  if (!seconds) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(1, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export const getTotalDuration = (songs: Song[]) => {
  const totalSum = songs.reduce((acc: number, song: Song) => {
    if (song.duration) {
      console.log('duration', song.duration);
      acc += Number(song.duration);
    } else {
      acc += 0;
    }
    return acc;
  }, 0);
  console.log({ totalSum });
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    if (hours > 0) return `${hours} hours ${minutes} minutes`;
    return `${minutes} minutes aprox`;
  };

  return formatTime(totalSum);
};
