from app.models import db, Playlist

def seed_playlists():
    library1 = Playlist(playlist_name='Library', owner_id=1)
    library2 = Playlist(playlist_name='Library', owner_id=2)
    library3 = Playlist(playlist_name='Library', owner_id=3)
    library4 = Playlist(playlist_name='Library', owner_id=4)
    library5 = Playlist(playlist_name='Library', owner_id=5)
    playlist1 = Playlist(playlist_name='emo', owner_id=4)
    playlist2 = Playlist(playlist_name='bangers', owner_id=2)
    playlist3 = Playlist(playlist_name='kpop', owner_id=3)
    


    db.session.add(library1)
    db.session.add(library2)
    db.session.add(library3)
    db.session.add(library4)
    db.session.add(library5)
    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)

    db.session.commit()

def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()
