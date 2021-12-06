from .db import db
from .playlist_songs import playlist_songs

class Song(db.Model):
    __tablename__ = 'songs'

    id= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    artist = db.Column(db.String(50), nullable=False)
    album = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.String(50), nullable=False)

    playlists = db.relationship('Playlist', back_populates='songs', secondary=playlist_songs)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'artist': self.artist,
            'album': self.album,
            'genre': self.genre
        }
