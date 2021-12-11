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
            <SongList search={search} songResult={songResult}/>
        )
    }

    let count = songResult.length

    return (

        <div>
            <form>
                <div>
                <div className='pageTitle'><div>Search</div></div>
                    <input
                        className='subTitleSearch'
                        type='text'
                        value={search}
                        placeholder='Find a song...'
                        onChange={(e) => setSearch(e.target.value)}
                    /> <span className={search.length == 0 ? 'hideText' :'subTitleSearch1'}> &nbsp; &bull; &nbsp;{count} {count == 1 ? 'result' : 'results'} found for '{search}'</span>
                </div>
            </form>
            <div className='tablediv'>
            <table className='tabletable'>
                <tr className='tableHeader'>
                    <th className='thId'>#</th>
                    <th className='thCover'>Title</th>
                    <th className='thTitle'></th>
                    <th className='thArtist'>Artist</th>
                    <th className='thAlbum'>Album</th>
                    <th className='thLike'></th>
                    <th className='thAdd'></th>
                </tr>
                {songOption}
                </table>
            </div>
        </div>
    )
}

export default Search
