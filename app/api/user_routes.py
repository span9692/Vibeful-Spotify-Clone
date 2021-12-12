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

@user_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_user(id):
    data = request.get_json()
    user = User.query.get(id)
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']
    user.profile_pic = data['profile_pic']
    user.password = data['password']
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': f'User {id} has been deleted'}), 200

@user_routes.route('/yolo/dashboard')
# @login_required
def get_followers():

    userIds = User.query.all()
    ids = [user.id for user in userIds]
    print(ids)
#follows = people that follow you (followers)
#followings = people that you follow (followees)
    followerslist = []
    followeeslist = []

    for id in ids:
        followers = db.session.query(follow_list).filter_by(followee_id = id).all()
        followerslist.append(followers)
        print(followerslist)

    for id in ids:
        followees = db.session.query(follow_list).filter_by(follower_id = id).all()
        followeeslist.append(followees)
        print(followeeslist)


    # follows = db.session.query(follow_list).filter_by(followee_id = id).all()

    # followings = db.session.query(follow_list).filter_by(follower_id = id).all()

    # print("************** FOLLOWS", follows)
    # print("************** FOLLOWING", followings)


    final_followers_list = []
    final_followee_list = []

    for follow in followerslist:
        temp_followers_list = []
        for foll in follow:
            user_follower = User.query.get(foll.follower_id)
            temp_followers_list.append(user_follower.to_dict())
        final_followers_list.append(temp_followers_list)

    for follow in followeeslist:
        temp_followee_list = []
        for foll in follow:
            user_followee = User.query.get(foll.followee_id)
            temp_followee_list.append(user_followee.to_dict())
        final_followee_list.append(temp_followee_list)

    # final_object = {}

    final_object = {}
    # for i in ids:
    #     final_object.setdefault(i, []).append(final_followers_list)

    # print(final_object)

    for id in ids:
        final_object[id] = {"followers":final_followers_list[id-1], 'followees':final_followee_list[id-1]}

    print('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', final_object, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')

    return jsonify(final_object)




# {1: {'followers': [<bound method User.to_dict of <User 2>>, <bound method User.to_dict of <User 4>>], 'followees': [<bound method User.to_dict of <User 2>>, <bound method User.to_dict of <User 3>>, <bound method User.to_dict of <User 4>>, <bound method User.to_dict of <User 5>>]}, 2: {'followers': [<bound method User.to_dict of <User 1>>, <bound method User.to_dict of <User 4>>], 'followees': [<bound method User.to_dict of <User 1>>, <bound method User.to_dict of <User 3>>]}, 3: {'followers': [<bound method User.to_dict of <User 1>>, <bound method User.to_dict of <User 2>>, <bound method User.to_dict of <User 4>>], 'followees': [<bound method User.to_dict of <User 4>>]}, 4: {'followers': [<bound method User.to_dict of <User 1>>, <bound method User.to_dict of <User 3>>], 'followees': [<bound method User.to_dict of <User 3>>, <bound method User.to_dict of <User 2>>, <bound method User.to_dict of <User 1>>]}, 5: {'followers': [<bound method User.to_dict of <User 1>>], 'followees': []}}











    #   followers_list = []
    #   followering_list = []

    #   for follow in followers:
    #     user_follower = User.query.get(follow.follower_id)
    #     followers_list.append(user_follower.to_dict())

    # print("------------> followers_list", followers_list)

    # for following in  followings:
    #     user_following = User.query.get(following.followee_id)
    #     following_list.append(user_following.to_dict())

    # print("------------> following_list", following_list)

    # return {"followers": followers_list, "following": following_list}
    return {'asdf':'asdf'}

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
