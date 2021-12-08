import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addPlaylist } from '../../store/playlist';
import { useHistory } from 'react-router';



const CreatePlaylist = () => {
  
  const [playlist_name, setPlaylist_name] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory()
  const dispatch = useDispatch();
  
  const sessionUser = useSelector((state) => state.session.user)
  if(!sessionUser) {
    // history.push('/');
    return <Redirect to="/" />;
  }
  
  const owner_id = sessionUser.id

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    console.log('!!!!$%$%', owner_id)
    const playlist = {
      playlist_name: 'Untitled Playlist',
      owner_id: owner_id
    };


    let newPlaylist = await dispatch(addPlaylist(playlist))
    // .catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors)
    //     } 
    //   } 
    // );

    
    // if (playlist_name) {
    //   history.push('/playlist');
    // }
    
  };

  

  return (
    <div>
      <h3>Add A Playlist</h3>
      <form onSubmit={handleSubmit} >
      {/* <div>
          <label>
            <input
              onChange={(e) => setPlaylist_name(e.target.value)}
              value={playlist_name}
              placeholder='Playlist Name'
            />
          </label>
        </div> */}
        {/* <div>
          <label>
            <input
              className = 'login-input'
              onChange={(e) => setOwnerId(e.target.value)}
              value={ownerId}
              placeholder='ownerId'
            />
          </label>
        </div> */}
        <button type='submit'>
          Create New Playlist
        </button>
      </form>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    </div>
  );
};
export default CreatePlaylist;