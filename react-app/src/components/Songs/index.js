import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function SongList() {
    const dispatch = useDispatch()

    const songs = useSelector(state => state.song)

    return (
        <div>
            Hello from songlist
        </div>
    )
}

export default SongList;