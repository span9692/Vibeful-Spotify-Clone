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
  const newUserLibrary = {...currentUserLibrary}
  const playlist_songs = useSelector((state) => state.playlist_song);

  let count = songs.length

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
// library table
  return (
    <div className='tablediv'>
      <div className='pageTitle'><div>Songs</div></div>
      <div className='subTitle'>Look through our entire library! &nbsp; &bull; &nbsp; {count} {count == 1 ? 'song' : 'songs'}</div>
      <table className='tabletable'>
        <tr className='tableHeader'>
          <th>#</th>
          <th>Title</th>
          <th></th>
          <th>Artist</th>
          <th>Album</th>
          <th></th>
          <th></th>
        </tr>
      {songs.map((song, index) => (
        <IndivSong key={song.id} index={index} song={song} currentUserLibrary={newUserLibrary} playlist_songs={playlist_songs} playlists={playlists}/>
      ))}
      </table>
    </div>
  );
}

export default SongList;
