from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Playlist, User, db

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/')
def all_playlists():
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


@playlist_routes.route('/<int:id>')
def get_playlist(id):
    playlist = Playlist.query.get(id)
    if not playlist:
        return jsonify({'Error Message': 'Playlist Id Cannot Be Found'}), 404
    return playlist.to_dict()


@playlist_routes.route('/<int:id>', methods=['DELETE'])
def delete_playlist(id):
    playlist = Playlist.query.get(id)
    db.session.delete(playlist)
    db.session.commit()
    return jsonify({'message': f'Playlist {id} has been deleted'}), 200




