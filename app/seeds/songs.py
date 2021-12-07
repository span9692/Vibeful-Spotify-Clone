from app.models import db, Song, playlist_songs, Playlist


def seed_songs():
    song1 = Song(title='Billy Jean', artist='Michael Jackson', album='Thriller', genre='Pop', url='https://res.cloudinary.com/photofinder/video/upload/v1638837028/vibeful%20mp3/michael_jackson_billy_jean_lyrics_fvibrd.mp3')
    song2 = Song(title='Goddamn', artist='Tyga', album='Kyoto', genre='Rap', url='https://res.cloudinary.com/photofinder/video/upload/v1638836615/vibeful%20mp3/Tyga_-_Goddamn_Audio_x8hyne.mp3')
    song3 = Song(title='Spaceman', artist='Hardwell', album='Hardwell Presents Revealed, Volume 3', genre='EDM', url='https://res.cloudinary.com/photofinder/video/upload/v1638837618/vibeful%20mp3/Hardwell_-_Spaceman_Original_Mix_qkvpfb.mp3')
    song4 = Song(title='Welcome to My Life', artist='Simple Plan', album='Still Not Getting Any...', genre='Rock', url='https://res.cloudinary.com/photofinder/video/upload/v1638837504/vibeful%20mp3/Welcome_to_my_life-lyrics_Full_song_ivvshi.mp3')
    song5 = Song(title='In The End', artist='Linkin Park', album='Hybrid Theory', genre='Rock', url='https://res.cloudinary.com/photofinder/video/upload/v1638837501/vibeful%20mp3/In_the_end_-_Linkin_Park_with_lyrics_jvzwba.mp3')
    song6 = Song(title='Bring Me To Life', artist='Evanescence', album='Fallen', genre='Rock', url='https://res.cloudinary.com/photofinder/video/upload/v1638837503/vibeful%20mp3/Evanescence-Bring_Me_To_Life_lyrics_fiywef.mp3')
    song7 = Song(title='Gold Digger', artist='Kanye West', album='Late Registration', genre='Rap', url='https://res.cloudinary.com/photofinder/video/upload/v1638837503/vibeful%20mp3/Kanye_West_-_Gold_Digger_feat._Jamie_Foxx_Lyrics_Video_f6vrpp.mp3')

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)

    db.session.commit()




def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
