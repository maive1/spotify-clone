import { Slider } from './Slider';
import { usePlayerStore } from '@/store/usePlayerStore';

const SpeakerWaveIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='size-5 text-gray-500 group-hover:text-white'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
    />
  </svg>
);
const SpeakerXMarkIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='size-5 text-gray-500 group-hover:text-white'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
    />
  </svg>
);

interface VolumeControlProps {
  handleVolume(value: number): void;
  toogleMute(): void;
  initialVolume: number;
}

export function VolumeControl({
  handleVolume,
  toogleMute,
  initialVolume = 0.8,
}: VolumeControlProps) {
  const volume = usePlayerStore(state => state.volume);

  const isMuted = volume === 0;
  return (
    <div className='flex flex-row gap-x-1 justify-around w-full px-4 z-50'>
      <button
        onClick={toogleMute}
        className='group items-center p-1 rounded transition'
      >
        {!isMuted ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
      </button>

      <Slider
        defaultValue={[initialVolume * 100]}
        value={[volume * 100]}
        max={100}
        min={0}
        className='w-[95px]'
        onValueChange={value => {
          const [newValue] = value;
          handleVolume(newValue);
        }}
      />
    </div>
  );
}
