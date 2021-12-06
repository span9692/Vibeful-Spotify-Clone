from app.models import db, Song, playlist_songs, Playlist


def seed_songs():
    song1 = Song(title='Billy Jean', artist='Michael Jackson', album='Heehee', genre='Pop')
    song2 = Song(title='Goddam', artist='Tyga', album='Kyoto', genre='Rap')
    song3 = Song(title='Spaceman', artist='Hardwell', album='Hardwell EP', genre='EDM')
    song4 = Song(title='Welcome to My Life', artist='Simple Plan', album='Balls', genre='Rock')
    song5 = Song(title='In The End', artist='Linkin Park', album='Meteora', genre='Rock')
    song6 = Song(title='Stronger', artist='Britney Spears', album='It\'s Britney', genre='Pop')
    song7 = Song(title='Gold Digger', artist='Kanye West', album='Late Registration', genre='Rap')

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
