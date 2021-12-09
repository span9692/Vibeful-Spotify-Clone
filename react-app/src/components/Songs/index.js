import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToLibrary, getLibrary, removeFromLibrary } from '../../store/playlist_songs'
import Player from '../Player'
import IndivSong from './IndivSong'
import { getPlaylists } from '../../store/playlist';
import { getSongs } from "../../store/song";

function SongList() {
  const dispatch = useDispatch();

  const songs = useSelector((state) => Object.values(state.song));
  const userId = useSelector((state) => state.session.user.id);
  const playlists = useSelector((state) => Object.values(state.playlist));
  const currentUserLibrary = playlists.filter(
    (el) => el.owner_id == userId && el.playlist_name == "Library"
  )[0];
  const playlist_songs = useSelector((state) => state.playlist_song);
  const newUserLibrary = {...currentUserLibrary}

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getPlaylists());
    dispatch(getLibrary());
  }, [dispatch]);

  if (currentUserLibrary) {
    if (!([currentUserLibrary.id] in playlist_songs)) {
      playlist_songs[currentUserLibrary.id] = [];
    }
  }

  return (
    <div>
      WILL STYLE AFTER ADDING NAV/SIDE BAR
      <table>
        <tr className='tableHeader'>
          <th>#</th>
          <th>Title</th>
          <th></th>
          <th>Artist</th>
          <th>Album</th>
          <th></th>
          <th></th>
        </tr>
      {songs.map((song) => (
        <IndivSong key={song.id} song={song} currentUserLibrary={newUserLibrary} playlist_songs={playlist_songs} playlists={playlists}/>
      ))}
      </table>
    </div>
  );
}

export default SongList;
