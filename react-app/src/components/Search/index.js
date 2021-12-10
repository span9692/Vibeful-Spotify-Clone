import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchSongs } from '../../store/song'

const Search = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const songResult = useSelector(state => state.song)
    console.log('songResult', songResult)

    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(searchSongs(search))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Search:
                    </label>
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <button>Search</button>
                </div>
            </form>
        </div>
    )
}

export default Search
