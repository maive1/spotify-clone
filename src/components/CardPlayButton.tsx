import { usePlayerStore } from '@/store/usePlayerStore';
import { Play, Pause } from './SongControls';

interface CardPlayButtonProps {
  id: string | undefined;
  size?: 'small' | 'large';
}

export function CardPlayButton({ id, size = 'small' }: CardPlayButtonProps) {
  const { currentMusic, setCurrentMusic, setIsPlaying, isPlaying } =
    usePlayerStore(state => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;
  const isPlayingSong = isPlaying && currentMusic?.playlist?.id === id;

  const handleClick = () => {
    if (!id) return;
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    // TODO: choose a random song from the playlist
    // how? find all songs with the same albumId
    // and choose a random one
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data;
        console.log('FETCH songs:', songs);
        const randomSong = songs[Math.floor(Math.random() * songs.length)];

        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: randomSong });
      });
  };

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={handleClick}
      className='bg-green-500 rounded-full card-play-button p-2 z-10  transform transition-transform duration-300 hover:scale-110 hover:brightness-110'
    >
      {isPlayingSong ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
}
