import AudioPlayer from 'react-h5-audio-player';
import './Player.css'
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from 'react-redux';

const Player = () => {
    const song = useSelector(state => state.audio)
    const user = useSelector(state => state.session.user);


    const userPlayer = (
        <div className='showPlayer'>
            <div className='playerinfo playersidecolumn'>
                <img className='playerImg' src={song?.cover}></img>
                <div className='playerSongAndArtist'>
                    <div className='playerTitle'>{song?.title}</div>
                    <div className='playerArtist'>{song?.artist}</div>
                </div>
            </div>
            {/* <div> */}
            <AudioPlayer
                className='musicPlayer'
                autoPlay
                showSkipControls="False"
                showFilledVolume="True"
                src={song.url}
            />
            {/* </div> */}
            <div className='playersidecolumn'></div>
        </div>
    )

    return (
         <>
      { user ? userPlayer : null }
    </>
    )
}

export default Player
