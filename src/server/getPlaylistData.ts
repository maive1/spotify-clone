import { allPlaylists, songs, type Song } from '@/lib/data';
import path from 'path';
import { promises as fs } from 'fs';
import * as mm from 'music-metadata';

export interface SongMetadata {
  format: {
    duration: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface SongWithMetadata extends Song {
  metadata: SongMetadata | null;
}

async function getSongMetadata(song: Song): Promise<SongMetadata> {
  const filePath = path.join(process.cwd(), 'public', song.src);
  const buffer = await fs.readFile(filePath);

  try {
    const metadata = await mm.parseBuffer(buffer, 'audio/mp3');
    return metadata as SongMetadata;
  } catch (error) {
    console.error('Error getting metadata:', error);
    throw error;
  }
}

export async function getPlaylistData(id: string) {
  const playlist = allPlaylists.find(playlist => playlist.id === id);

  if (!playlist) {
    throw new Error('Playlist not found');
  }

  const playlistSongs = songs.filter(
    song => song.albumId === playlist?.albumId
  );

  const allSettledResults = await Promise.allSettled(
    playlistSongs.map(song => getSongMetadata(song))
  );

  const songsWithMetadata: Song[] = allSettledResults.map((result, index) => {
    if (result.status === 'fulfilled') {
      return {
        ...playlistSongs[index],
        duration: result.value.format.duration,
      };
    } else {
      console.error(
        `Error processing song ${playlistSongs[index].title}:`,
        result.reason
      );
      return { ...playlistSongs[index], duration: undefined };
    }
  });

  return { playlist, songs: songsWithMetadata };
}
