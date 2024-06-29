import type { CurrentMusic } from '@/store/usePlayerStore';

export function CurrentSong({ song }: CurrentMusic) {
  const { image = '', title = '', artists = [] } = song || {};
  const artistsNames = artists.join(',');

  return (
    <div className='flex items-center gap-5 relative overflow-hidden'>
      <picture className='w-16 h-16 bg-zinc-800 shadow-lg rounded-md'>
        <img src={image} alt={title}></img>
      </picture>
      <div className='flex flex-col'>
        <h3 className='font-semibold text-sm block'>{title}</h3>
        <span className='text-sx opacity-89'>{artistsNames}</span>
      </div>
    </div>
  );
}
