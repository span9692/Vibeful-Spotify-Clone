import "./RowPlaylist.css";

function RowPlaylist({urlId, allSongs, currentUserLibraryId, allPlaylists, allPlaylistSongs}) {
    // console.log('urlId', urlId)
    // console.log('allSongs',allSongs) //array of all songs
    // console.log('currentUserLibraryId',currentUserLibraryId) //2
    // console.log('allPlaylists', allPlaylists) // array of all playlists
    // console.log('allPlaylistSongs', allPlaylistSongs) // dict of playlist:[songs]

    let usersPlaylist = allPlaylists.filter(el => el.owner_id == urlId && el.playlist_name != 'Library') //relevant playlists
    // console.log('USERSPLAYLIST', usersPlaylist)

    if (usersPlaylist.length > 5) {
        usersPlaylist = usersPlaylist.slice(0,5)
    }

    return (
        <div>
            <h2 className='dashHeader'>Your Playlists</h2>
            <div className="main_row">
            {usersPlaylist.map(playlist => (
                <div className="sub_row">
                    <img className='subsubrow' src={playlist.playlist_pic}></img>
                    <div>{playlist.playlist_name}</div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default RowPlaylist
