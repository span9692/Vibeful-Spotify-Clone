import React from "react";
import Playlist from "../Playlists/Playlist"
import Library from "../Library/Library"
import Player from '../Player/index'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addPlaylist, getPlaylists } from "../../store/playlist";
import { Redirect } from 'react-router-dom';
import "./Dashboard.css"

const Dashboard = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user)
  const asdf = useSelector((state) => state.playlist)

  useEffect(() => {
    dispatch(getPlaylists())
  }, [dispatch])

  if(!sessionUser) {
    // history.push('/');
    return <Redirect to="/" />;
  }

  const owner_id = sessionUser.id

  const add = () => {
    dispatch(addPlaylist({
      playlist_name: 'Untitled Playlist',
      owner_id: owner_id
    }))
  }


  return (
    <>
      <div className="dashboard">
        <div className="dashboard-top-navbar"></div>
        <div className="dashboard-main">
          <div className="dashboard-main-leftnav">
            <div className="d-m-leftnav-top">
              <ul>
                <li>
                  <div className="d-m-leftnav-item">
                  <i className="fas fa-search"></i><span>Search</span>
                  </div>
                </li>
                <li>
                  <div className="d-m-leftnav-item">
                  <i className="fas fa-icons"></i><span>Your library</span>
                  </div>
                </li>
              </ul>
              <div className="liner"></div>
              <ul>
                <li>
                  <div className="d-m-leftnav-item">
                  <i class="fas fa-microphone-alt"></i><span>Add a song</span>
                  </div>
                </li>
                <li>
                  <div className="d-m-leftnav-item">
                  <i class="fab fa-napster"></i><span className='pointer' onClick={() => add()}>Create a playlist</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="liner"></div>
            <Playlist />
          </div>
          <div className="dashboard-main-rightcontent">
            <Library />
          </div>
        </div>
        {/* <div className="dashboard-bot-player"><Player /></div> */}
      </div>
    </>
  );
};

export default Dashboard;
