import type { Playlist, Song } from '@/lib/data';
import { create } from 'zustand';

export interface CurrentMusic {
  playlist: Playlist | null;
  song: Song | null;
  songs: Song[] | null;
}

interface PlayerStore {
  isPlaying: boolean;
  currentMusic: CurrentMusic;
  volume: number;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: CurrentMusic) => void;
  setVolume: (volume: number) => void;
  isMuted: boolean;
}

export const usePlayerStore = create<PlayerStore>(set => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  isMuted: false,
  setVolume: volume => set({ volume }),
  setIsPlaying: isPlaying => set({ isPlaying }),
  setCurrentMusic: currentMusic => set({ currentMusic }),
}));
