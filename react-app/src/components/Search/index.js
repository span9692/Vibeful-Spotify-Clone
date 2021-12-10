import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchSongs } from '../../store/song'

const Search = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const songResult = useSelector(state => Object.values(state.song))
    console.log('songResult', songResult)

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(searchSongs(search))
    // }

    useEffect(()=>{
        dispatch(searchSongs(search))
    }, [dispatch, search])

    let option = null;

    if (songResult.length > 0) {
        
    }

    return (

        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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
        </div>
    )
}

export default Search
