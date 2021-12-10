from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import follow_list, User, db

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/')
def all_follows():
    follows = db.session.query(follow_list).all()

    followObj = {}
    for i in follows:
        followObj.setdefault(i[0], []).append(i[1])

    return followObj



@follow_routes.route('/', methods=['POST'])
def newFollow():
    data = request.get_json()
    db.session.execute(follow_list.insert().values(follower_id=data['follower_id'], followee_id=data['followee_id']))
    db.session.commit()
    return {"follower_id": data['follower_id'], "followee_id": data['followee_id']}



@follow_routes.route('/delete', methods=['DELETE'])
def deleteFollow():
    data = request.get_json()
    db.session.execute(follow_list.delete().where(follow_list.c.follower_id==data['follower_id']).where(follow_list.c.followee_id==data['followee_id']))
    db.session.commit()
    return {"follower_id":data['follower_id'], "followee_id":data['followee_id']}


