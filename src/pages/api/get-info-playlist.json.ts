import type { APIRoute } from 'astro';
import { allPlaylists, songs } from '@/lib/data';

//TODO: Get songs from bucket and return them with metadata and playlist info
export const GET: APIRoute = async ({ request }) => {
  const { url } = request;
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get('id');

  const playlist = allPlaylists.find(playlist => playlist.id === id);

  if (!playlist) {
    return new Response(JSON.stringify({ error: 'Playlist not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
  }

  const playlistSongs = songs.filter(
    song => song.albumId === playlist?.albumId
  );

  return new Response(JSON.stringify({ playlist, songs: playlistSongs }), {
    headers: { 'content-type': 'application/json' },
  });
};
