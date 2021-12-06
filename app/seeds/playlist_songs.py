from app.models import db, playlist_songs
from sqlalchemy import insert

def seed_playlist_songs():
    insert(playlist_songs).values(
        playlist_id = 1, song_id = 1
    )
    # playlist_song1 = playlist_songs(1, 1)
    # playlist_song2 = playlist_songs(1, 2)
    # playlist_song3 = playlist_songs(1, 3)
    # playlist_song4 = playlist_songs(2, 1)
    # playlist_song5 = playlist_songs(2, 3)
    # playlist_song6 = playlist_songs(2, 6)
    # playlist_song7 = playlist_songs(3, 1)
    # playlist_song8 = playlist_songs(3, 5)
    # playlist_song9 = playlist_songs(3, 7)

    # db.session.add(playlist_song1)
    # db.session.add(playlist_song2)
    # db.session.add(playlist_song3)
    # db.session.add(playlist_song4)
    # db.session.add(playlist_song5)
    # db.session.add(playlist_song6)
    # db.session.add(playlist_song7)
    # db.session.add(playlist_song8)
    # db.session.add(playlist_song9)

    # db.session.commit()


def undo_playlist_songs():
    db.session.execute('TRUNCATE playlist_songs RESTART IDENTITY CASCADE;')
    db.session.commit()
