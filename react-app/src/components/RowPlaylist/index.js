import "./RowPlaylist.css";

function RowPlaylist({urlId, allSongs, currentUserLibraryId, allPlaylists, allPlaylistSongs}) {
    console.log('urlId', urlId)
    console.log('allSongs',allSongs) //array of all songs
    console.log('currentUserLibraryId',currentUserLibraryId) //2
    console.log('allPlaylists', allPlaylists) // array of all playlists
    console.log('allPlaylistSongs', allPlaylistSongs) // dict of playlist:[songs]

    let usersPlaylist = allPlaylists.filter(el => el.owner_id == urlId && el.playlist_name != 'Library') //relevant playlists
    console.log('USERSPLAYLIST', usersPlaylist)

    

    return (
        <>
            <h2>Your Playlists</h2>
            <div className="main_row"></div>
            {usersPlaylist.map(playlist => (
                <div></div>
            ))}
        </>
    )
}

export default RowPlaylist