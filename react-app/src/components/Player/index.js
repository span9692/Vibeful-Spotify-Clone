import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = () => {
    return (
        <>
            <AudioPlayer 
                autoPlay 
                src='https://res.cloudinary.com/photofinder/video/upload/v1638837028/vibeful%20mp3/michael_jackson_billy_jean_lyrics_fvibrd.mp3'
            />
        </>
    )
}

export default Player