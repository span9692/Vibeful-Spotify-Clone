from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Playlist, User

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/')
def all_playlists():
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}


