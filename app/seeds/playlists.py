from app.models import db, Playlist

def seed_playlists():
    playlist1 = Playlist(playlist_name='wub wub wub', owner_id=2)
    # playlist1.songs.extend([song1, song2, song3])
    playlist2 = Playlist(playlist_name='wub wub', owner_id=2)
    # playlist2.songs.extend([song1, song3, song6])
    playlist3 = Playlist(playlist_name='bangers', owner_id=2)
    # playlist3.songs.extend([song1, song5, song7])
    playlist4 = Playlist(playlist_name='slaps', owner_id=3)
    playlist5 = Playlist(playlist_name='kpop', owner_id=3)
    playlist6 = Playlist(playlist_name='hard rap shit', owner_id=4)
    playlist7 = Playlist(playlist_name='emo', owner_id=4)

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.add(playlist5)
    db.session.add(playlist6)
    db.session.add(playlist7)

    db.session.commit()

def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()
