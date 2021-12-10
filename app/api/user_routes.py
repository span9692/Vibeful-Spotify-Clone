from flask import Blueprint, jsonify, session, request, current_app
from flask_login import login_required, current_user
from app.models import User, follow_list, db
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/edit', methods=['POST'])
def edit_user(id):
    data = request.get_json()
    user = User.query.get(id)
    user.profile_pic = data['data']
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': f'User {id} has been deleted'}), 200

@user_routes.route('/<int:id>/dashboard')
# @login_required
def get_followers(id):
    follows = db.session.query(follow_list).filter_by(followee_id = id).all()

    followings = db.session.query(follow_list).filter_by(follower_id = id).all()

    # print("************** FOLLOWS", follows)
    # print("************** FOLLOWING", followings)

    followers_list = []
    following_list = []

    for follow in follows:
        user_follower = User.query.get(follow.follower_id)
        followers_list.append(user_follower.to_dict())

    # print("------------> followers_list", followers_list)

    for following in  followings:
        user_following = User.query.get(following.followee_id)
        following_list.append(user_following.to_dict())

    # print("------------> following_list", following_list)

    return {"followers": followers_list, "following": following_list}


@user_routes.route('/<int:id>/dashboard', methods=['DELETE'])
@login_required
def unfollow(id):
    unfollow_user = db.session.query(follow_list).filter(follow_list.c.follower_id == current_user.id, follow_list.c.followee_id == id ).first()

    # print("**********DISBEDA UNFOLLOW_USER***********",unfollow_user)

    db.session.delete(unfollow_user)
    db.session.commit()

    return jsonify({'message': f'Unfollowed user {id} '}), 200





@user_routes.route('/<int:id>/dashboard', methods=['POST'])
@login_required
def follow(id):
    data = request.get_json()

    db.session.execute(follow_list.insert().values(follower_id=current_user.id), followee_id=id)


    db.session.commit()


    return "Followed User!"










# @user_routes.route('/<int:id>/dashboard', methods=['POST'])
# @login_required
# def follow(id):
#     follow_user = db.session.query(follow_list).filter(follow_list.c.follower_id == current_user.id, follow_list.c.followee_id == id ).first()

#     db.session.add(follow_user)
#     db.session.commit()

#     return jsonify({'message': f'Unfollowed user {id} '}), 200
