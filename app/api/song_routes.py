from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from app.models import Song

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def songs():
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}


@song_routes.route('/<int:id>')
def song(id):
    song = Song.query.get(id)
    return song.to_dict()

@song_routes.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    songs = Song.query.filter(or_(Song.title.ilike(f'%{data}%'), Song.artist.ilike(f'%{data}%')))
    return {'songs': [song.to_dict() for song in songs]}
