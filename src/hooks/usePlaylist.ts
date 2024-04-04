import { useEffect, useState } from "react";
import { Playlist } from "../types/playlist";

export function usePlaylist() {
  const API_URL = `${import.meta.env.VITE_API_URL}`;
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  async function fetchPlaylist(): Promise<Playlist | null> {
    try {
      const response = await fetch(`${API_URL}/videos`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: Playlist = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  useEffect(() => {
    async function getPlaylist() {
      const playlist = await fetchPlaylist();
      if (playlist) {
        setPlaylist(playlist);
      }
    }
    if (!playlist) {
      getPlaylist();
    }
  }, []);

  return { playlist };
}
