import React from "react";
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylists, deletePlaylist, updatePlaylist } from '../../store/playlist'
import CreatePlaylist from '../CreatePlaylist'
import EditPlaylistForm from '../UpdatePlaylist'

const Playlist = () => {
  const dispatch = useDispatch()

  const playlists = useSelector(state => Object.values(state.playlist))
  const sessionUser = useSelector((state) => state.session.user)
  useEffect(() => {
      dispatch(getPlaylists())
  }, [dispatch])

  const handleDelete = (id) => {
      dispatch(deletePlaylist(id));
    };



  return (
    <>
            <div className="d-m-leftnav-bot">
            <ul className='ul'>
              {playlists?.map(playlist => (playlist.owner_id === sessionUser?.id?
                  <li key={playlist.id}>
                      {playlist.playlist_name}
                  </li>
                  
                  : null
                      
                  ))}
            </ul>
              {/* <ul>
                <li>Playlist 1 1232312 2132 13213 </li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
                <li>Playlist 1</li>
                <li>Playlist 2</li>
              </ul> */}
            </div>
    </>
  );
};

export default Playlist;
