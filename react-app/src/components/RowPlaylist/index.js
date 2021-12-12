import "./RowPlaylist.css";
import { Link } from 'react-router-dom'

function RowPlaylist({urlId, allSongs, currentUserLibraryId, allPlaylists, allPlaylistSongs}) {
    // console.log('urlId', urlId)
    // console.log('allSongs',allSongs) //array of all songs
    // console.log('currentUserLibraryId',currentUserLibraryId) //2
    // console.log('allPlaylists', allPlaylists) // array of all playlists
    // console.log('allPlaylistSongs', allPlaylistSongs) // dict of playlist:[songs]

    let usersPlaylist = allPlaylists.filter(el => el.owner_id == urlId && el.playlist_name != 'Library') //relevant playlists
    console.log('USERSPLAYLIST', usersPlaylist)

    if (usersPlaylist.length > 5) {
        usersPlaylist = usersPlaylist.slice(0,5)
    }

    let option;
    if (usersPlaylist.length > 0) {
        option = (
            <div className='tablediv tabletable tableHeader'>
                <div className="main_row">
                {usersPlaylist.map(playlist => (
                    <div key={playlist.id}>
                        <Link className="sub_row" to={`/playlist/${playlist.id}`}>
                            <img className='subsubrow' src={playlist.playlist_pic}></img>
                            <div>{playlist.playlist_name}</div>
                        </Link>
                    </div>
                ))}
                </div>
            </div>
        )
    } else {
        option = null;
    }

    return (
        <>
            <h2 className='dashHeader'>Your Playlists</h2>
            {option}
        </>
    )
}

export default RowPlaylist
