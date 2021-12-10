import React from "react";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylists, deletePlaylist, updatePlaylist } from '../../store/playlist'

const Playlist = () => {
  const dispatch = useDispatch()

  const playlists = useSelector(state => Object.values(state.playlist))
  const sessionUser = useSelector((state) => state.session.user)
  useEffect(() => {
      dispatch(getPlaylists())
  }, [dispatch])

    return (
    <>
            <div className="d-m-leftnav-bot">
            <ul className='ul'>
              {playlists?.map(playlist => (playlist.owner_id === sessionUser?.id && playlist.playlist_name !== 'Library'?
                  <li key={playlist.id}>
                    <NavLink  to={`/playlist/${playlist.id}`}>{playlist.playlist_name}</NavLink>
                  </li>
                  : null
                  ))}
            </ul>
            </div>
    </>
  );
};

export default Playlist;
