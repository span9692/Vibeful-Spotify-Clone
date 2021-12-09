import { useEffect} from "react";
import { useDispatch } from "react-redux";
import {
  addToLibrary,
  getLibrary,
  removeFromLibrary,
} from "../../store/playlist_songs";
import { getSongs } from "../../store/song";
import { playMusic } from "../../store/audio";
import { getPlaylists } from "../../store/playlist";
import AddToPlaylist from "../AddSongtoPlaylist";


function IndivSong({song, currentUserLibrary, playlist_songs, playlists}) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getSongs());
  //   dispatch(getPlaylists());
  //   dispatch(getLibrary());
  // }, [dispatch]);

  const play = (song) => {
    dispatch(playMusic(song));
  };

  const addLibrarySong = (song) => {
    dispatch(addToLibrary(song, currentUserLibrary));
  };

  const removeLibrarySong = (song) => {
    dispatch(removeFromLibrary(song, currentUserLibrary));
  };

  return (
    <div>
      <button onClick={() => play(song)}>
        {song.title} -- {song.artist}
      </button>
      {
      playlist_songs[currentUserLibrary.id]
        ? [
            playlist_songs[currentUserLibrary.id].includes(song.id) ? (
              <button onClick={() => removeLibrarySong(song)}>
                Unlike
              </button>
            ) : (
              <button onClick={() => addLibrarySong(song)}>Like</button>
            ),
          ]
        : null
      }
      <AddToPlaylist song={song} playlists={playlists} currentUserLibrary={currentUserLibrary}/>
    </div>
  );
}

export default IndivSong;
