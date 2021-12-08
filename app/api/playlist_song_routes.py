from flask import Blueprint, jsonify, request
from app.models import playlist_songs, db
from sqlalchemy import insert, delete

playlist_songs_routes = Blueprint('playlist_songs', __name__)


@playlist_songs_routes.route('/')
def getLibrarySong():
    allPlaylistSongs = db.session.query(playlist_songs).all()
    
    playlistSong = {}
    for i in allPlaylistSongs:
        playlistSong.setdefault(i[0], []).append(i[1])

    return playlistSong

@playlist_songs_routes.route('/', methods=['POST'])
def newSongtoLibrary():
    data = request.get_json()
    db.session.execute(playlist_songs.insert().values(playlist_id=data['currentUserLibrary']['id'], song_id=data['song']['id']))
    db.session.commit()
    return {"listId":data['currentUserLibrary']['id'], "musicId":data['song']['id']}

# @playlist_songs_routes.route('/', methods=['POST'])
# def removeSongFromLibrary():
#     data = request.get_json()
#     removePlaylistSong = db.session.execute(playlist_songs.delete().where(playlist_songs.c.playlist_id==data['currentUserLibrary']['id']).where(playlist_songs.c.song_id==data['song']['id']))
#     db.session.commit()
#     return 'Success!'    

@playlist_songs_routes.route('/delete', methods=['DELETE'])
def removeSongFromLibrary():
    data = request.get_json()
    print('~~~~~DATA IN THE BACKEND YO~~~~~', data)
    db.session.execute(playlist_songs.delete().where(playlist_songs.c.playlist_id==data['currentUserLibrary']['id']).where(playlist_songs.c.song_id==data['song']['id']))
    db.session.commit()
    return {"listId":data['currentUserLibrary']['id'], "musicId":data['song']['id']}    