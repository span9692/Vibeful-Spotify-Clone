import IndivSong from "../Songs/IndivSong";
import "./RowSong.css";

function RowSong({urlId, allSongs, currentUserLibraryId, allPlaylists, allPlaylistSongs}) {
  console.log('urlId', urlId)
  console.log('allSongs',allSongs)
  console.log('allPlaylists',allPlaylists)
  console.log('allPlaylistSongs',allPlaylistSongs) //joins table

  let currentUserLibrary = allPlaylists.filter(el => el.owner_id == urlId && el.playlist_name == 'Library')[0]
  // let currentUserLibraryId = currentUserLibrary?.id //just the library 'playlist' id

  let songId = allPlaylistSongs[currentUserLibraryId.toString()]

  if (!songId) { //if library is empty
    songId = []
  }

  const shuffle = (arr) => {
    arr.sort(()=>Math.random()-0.5);
    return arr
  }

  let relevantSongs = allSongs.filter(el => songId.includes(el.id)) //randomize songs
  relevantSongs = shuffle(relevantSongs)

  if (relevantSongs.length > 5) { //only display 5 songs
    relevantSongs = relevantSongs.slice(0,5)
  }
  console.log('relevantSongs', relevantSongs)

  return (
    <>
      <h2>Liked Songs</h2>
      <div>
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
          {relevantSongs.map((song, index) => (
        <IndivSong key={song.id} index={index} song={song} currentUserLibrary={currentUserLibrary} playlist_songs={allPlaylistSongs} playlists={allPlaylists}/>
      ))}
        </table>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>Recent Playlists</h2>
      <div className="main_row">
        {relevantSongs.map(song => (
          <img className='coverImg' src={song.cover}/>
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>Explore More Songs</h2>
      <div className="main_row">
        <div>Song 1</div>
        <div>Song 2</div>
        <div>Song 3</div>
        <div>Song 4</div>
        <div>Song 5</div>
      </div>
    </>
  );
}

export default RowSong;
