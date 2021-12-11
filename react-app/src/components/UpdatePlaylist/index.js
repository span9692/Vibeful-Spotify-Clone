import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlaylist } from '../../store/playlist';


const EditPlaylistForm = ({ playlistId }) => {
  const playlist = useSelector(state => state.playlist[playlistId]);
  const dispatch = useDispatch();
   const [playlist_name, setPlaylistName] = useState(playlist.playlist_name);

   const updateName = (e) => setPlaylistName(e.target.value);

  const handleSubmit = async (e) => {
    // console.log(playlist_name)
    e.preventDefault();

    const payload = {
      ...playlist,
      playlist_name
    };
    const updatedName = await dispatch(updatePlaylist(payload));

  };

  return (
    <>
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Playlist Name"
          value={playlist_name}
         onChange={updateName}
          />
        <button className='update-button' type="submit">
          Update Playlist Name
        </button>
      </form>
    </section>
    {/* {!playlist_name?
      <ul>
        <li>Name Field Required</li>
      </ul> : null
    } */}
    </>
  );
};

export default EditPlaylistForm;
