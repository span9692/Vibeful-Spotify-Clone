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

# @user_routes.route('/<int:id>/dashboard')
# # @login_required
# def get_followers(id):
#     followers = db.session.query(follow_list).filter_by(followee_id = id).all()
#     followers_list = []
#     for follower in followers:
#         user_follower = User.query.get(follower.follower_id)
#         user_followee = User.query.get(follower.followee_id)
#         updated_follower = user_follower.to_dict()
#         updated_follower["followee_first_name"] = user_followee.first_name
#         updated_follower["followee_last_name"] = user_followee.last_name
#         followers_list.append(updated_follower)

#     return jsonify({"My_Followers": followers_list})



@user_routes.route('/<int:id>/follows', methods=['GET'])
@login_required
def getFollowing(id):
    all_follows = db.session.query(follow_list).filter(follow_list.c.follower_id == id).all()

    # print("````CURRENTUSER-------->>>>>>>>>>>>>>", current_user.to_dict())
    # currentUser = current_user.to_dict()
    # print("````THISBEDA CURRENT USER ----------->", currentUser["id"])

    # unfollow_user = db.session.query(follow_list).filter(follow_list.c.follower_id == current_user.id, follow_list.c.followee_id == id ).first()

    # print("````DISBEDA UNFOLLOW_USER--------------------------->", unfollow_user)


    following_list = {}
    for i in all_follows:
        following_list.setdefault(i[0], []).append(i[1])

    return following_list



@user_routes.route('/<int:id>/follows', methods=['GET'])
@login_required
def getFollowers(id):
    all_followees = db.session.query(follow_list).filter(follow_list.c.followee_id == id).all()

    follower_list = {}
    for i in all_followees:
        follower_list.setdefault(i[0], []).append(i[1])

    return follower_list



@user_routes.route('/<int:id>/dashboard', methods=['DELETE'])
@login_required
def unfollow(id):
    unfollow_user = db.session.query(follow_list).filter(follow_list.c.follower_id == current_user.id, follow_list.c.followee_id == id ).first()

    print("**********DISBEDA UNFOLLOW_USER***********",unfollow_user)

    db.session.delete(unfollow_user)
    db.session.commit()

    return jsonify({'message': f'Unfollowed user {id} '}), 200



@user_routes.route('/<int:id>/dashboard', methods=['POST'])
@login_required
def follow(id):
    follow_user = db.session.query(follow_list).filter(follow_list.c.follower_id == current_user.id, follow_list.c.followee_id == id ).first()

    db.session.add(follow_user)
    db.session.commit()

    return jsonify({'message': f'Unfollowed user {id} '}), 200
