import IndivSong from "../Songs/IndivSong"

function RowExplore({urlId, allSongs, currentUserLibrary, currentUserLibraryId, allPlaylists, allPlaylistSongs}) {
    console.log('urlId', urlId)
    console.log('allSongs',allSongs) //array of all songs
    console.log('currentUserLibraryId', currentUserLibraryId) // 3
    console.log('allPlaylists',allPlaylists)  // array of all playlists
    console.log('allPlaylistSongs',allPlaylistSongs) // object of playlist:[songs]

    let irrelevantPlaylists = allPlaylists.filter(el => el.owner_id === currentUserLibraryId)
    console.log("irrelevantPlaylists", irrelevantPlaylists)
    let knownSongsId = []

    irrelevantPlaylists.forEach(playlist => {
        let playlistSong = allPlaylistSongs[playlist.id] //array of songId
        if (playlistSong) {
            knownSongsId.push(...playlistSong)
        }
    })

    let uniqueKnownSongId = [...new Set(knownSongsId)]
    console.log('uniqueKnownSongId', uniqueKnownSongId)

    let unknownSongs = allSongs.filter(el => !uniqueKnownSongId.includes(el.id))
    console.log('unknownSongs', unknownSongs)

    // if (unknownSongs.length > 5) { //only display 5 songs
    //     unknownSongs = unknownSongs.slice(0,5)
    // }

    return (
        <>
            <h2>Liked Songs</h2>
            <div className='tablediv'>
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
                    {unknownSongs.map((song, index) => (
                    <IndivSong key={song.id} index={index} song={song} currentUserLibrary={currentUserLibrary} playlist_songs={allPlaylistSongs} playlists={allPlaylists}/>
                ))}
                </table>
            </div>
        </>
    )
}

export default RowExplore
