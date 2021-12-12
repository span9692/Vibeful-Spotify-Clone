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


@follow_routes.route('/allUsers')
def all_Users():
    all = User.query.all()
    return {'users': [all.to_dict() for all in all]}




@follow_routes.route('/', methods=['POST'])
def newFollow():
    data = request.get_json()
    print('IN THE BACKEND', data, 'end of datammmmmmmmmmmmmmmmmmmmmmmmm')
    db.session.execute(follow_list.insert().values(follower_id=data['follower']['id'], followee_id=data['followee']['id']))
    db.session.commit()
    return {"follower_id": data['follower'], "followee_id": data['followee']}



@follow_routes.route('/delete', methods=['DELETE'])
def deleteFollow():
    data = request.get_json()
    print('mmmmmmmmmmmmmmmmmmmmmmmmmm', data, 'mmmmmmmmmmmmmmmmmmmmmmmmmmm')
    db.session.execute(follow_list.delete().where(follow_list.c.follower_id==data['follower']['id']).where(follow_list.c.followee_id==data['followee']['id']))
    db.session.commit()
    return {"follower":data['follower'], "followee":data['followee']}
