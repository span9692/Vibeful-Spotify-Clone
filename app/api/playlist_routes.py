from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import Playlist, User, db
from app.forms import PlaylistForm, UpdatePlaylistForm

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/')
def all_playlists():
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


@playlist_routes.route('/<int:id>')
def get_playlist(id):
    playlist = Playlist.query.get(id)
    if not playlist:
        return jsonify({'message': f'Playlist Id {id} Cannot Be Found'}), 404
    return playlist.to_dict()


@playlist_routes.route('/<int:id>', methods=['DELETE'])
def delete_playlist(id):
    playlist = Playlist.query.get(id)
    db.session.delete(playlist)
    db.session.commit()
    return jsonify({'message': f'Playlist {id} has been deleted'}), 200



@playlist_routes.route('/', methods=['POST'])
def create_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlist = Playlist(
            playlist_name=form.data['playlist_name'],
            owner_id=form.data['owner_id']
        )
        db.session.add(playlist)
        db.session.commit()
        return playlist.to_dict()
    return {'message': 'unable to create playlist'}, 401


@playlist_routes.route('/<int:id>', methods=['PUT'])
def update_playlist(id):
    form = UpdatePlaylistForm()
    playlist = Playlist.query.get(id)
    if not playlist:
        return jsonify({'message': f'Playlist Id {id} Cannot Be Found'}), 404
    playlist.playlist_name = form.data['playlist_name']
    playlist.owner_id= form.data['owner_id']
    db.session.commit()
    return playlist.to_dict()
    








    




