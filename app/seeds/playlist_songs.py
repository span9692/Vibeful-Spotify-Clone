from app.models import db, playlist_songs
from sqlalchemy import insert

def seed_playlist_songs():
    # db.session.execute(playlist_songs.insert().values(playlist_id=5, song_id=5))

    db.session.execute(playlist_songs.insert().values(playlist_id=1, song_id=1))
    db.session.execute(playlist_songs.insert().values(playlist_id=1, song_id=2))
    db.session.execute(playlist_songs.insert().values(playlist_id=1, song_id=3))
    db.session.execute(playlist_songs.insert().values(playlist_id=2, song_id=1))
    db.session.execute(playlist_songs.insert().values(playlist_id=2, song_id=3))
    db.session.execute(playlist_songs.insert().values(playlist_id=2, song_id=6))
    db.session.execute(playlist_songs.insert().values(playlist_id=3, song_id=1))
    db.session.execute(playlist_songs.insert().values(playlist_id=3, song_id=5))
    db.session.execute(playlist_songs.insert().values(playlist_id=3, song_id=7))

    # db.session.add(playlist_song1)
    # db.session.add(playlist_song2)
    # db.session.add(playlist_song3)
    # db.session.add(playlist_song4)
    # db.session.add(playlist_song5)
    # db.session.add(playlist_song6)
    # db.session.add(playlist_song7)
    # db.session.add(playlist_song8)
    # db.session.add(playlist_song9)

    db.session.commit()


def undo_playlist_songs():
    db.session.execute('TRUNCATE playlist_songs RESTART IDENTITY CASCADE;')
    db.session.commit()
