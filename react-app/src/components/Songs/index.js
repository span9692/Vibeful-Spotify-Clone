import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSongs } from '../../store/song'
import { playMusic } from '../../store/audio'
import Player from '../Player'

function SongList() {
    const dispatch = useDispatch()

    const songs = useSelector(state => Object.values(state.song))

    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    const play = (song) => {
        dispatch(playMusic(song))
    }

    const addToLibrary = (song) => {
        console.log('YOOOOO WE HERE')
    }

    return (
        <div>
            HELLO FROM SONGLIST
            {songs.map(song => (
                <div key={song.id}>
                    <button onClick={() => play(song)}>{song.title} -- {song.artist}</button>
                    <button onClick={() => addToLibrary(song)}>Like</button>
                    <button>Add to Playlist</button>
                </div>

            ))}
            <Player />
        </div>
    )
}

export default SongList;