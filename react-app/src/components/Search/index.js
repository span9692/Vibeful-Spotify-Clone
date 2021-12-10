import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchSongs } from '../../store/song'
import SongList from '../SongList'

const Search = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const songResult = useSelector(state => Object.values(state.song))

    useEffect(()=>{
        dispatch(searchSongs(search))
    }, [dispatch, search])

    let songOption = null;

    if (songResult.length > 0) {
        songOption = (
            <SongList songResult={songResult}/>
        )
    }

    return (

        <div>
            <form>
                <div>
                    <label>
                        Search
                    </label>
                    <div></div>
                    <input
                        type='text'
                        value={search}
                        placeholder='Find a song...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </form>
            {songOption}
        </div>
    )
}

export default Search
