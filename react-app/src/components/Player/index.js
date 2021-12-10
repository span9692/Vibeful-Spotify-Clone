import AudioPlayer from 'react-h5-audio-player';
import './Player.css'
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from 'react-redux';

const Player = () => {
    const song = useSelector(state => state.audio)
    const user = useSelector(state => state.session.user);

    const userPlayer = (
        <div className='showPlayer'>
            <AudioPlayer
                autoPlay
                showSkipControls="False"
                showFilledVolume="True"
                src={song.url}
            />
        </div>
    )

    return (
         <>
      { user ? userPlayer : null }
    </>
    )
}

export default Player
