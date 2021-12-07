from flask import Blueprint, jsonify, session, request, current_app
from flask_login import login_required
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
def unfollow(id):
    all_follows = db.session.query(follow_list).filter(follow_list.c.follower_id == id).all()

    all_followees = db.session.query(follow_list).filter(follow_list.c.followee_id == id).all()

    new_list = {}
    for i in all_follows:
        new_list.setdefault(i[0], []).append(i[1])

    print("BINGBONGBINGONB", new_list)


    return new_list


    # data = db.session.query(follow_list).filter_by(followee_id = id, follower_id = followerId).all()
    # db.session.delete(data)
    # db.session.commit()

    # return jsonify({"Message": "Unfollowed user"}), 200

# @user_routes.route('/<int:id>/dashboard', methods='POST')
# # @login_required
# def follow(id):
#     db_uri = current_app.config['SQLALCHEMY_DATABASE_URI']
#     engine = create_engine(db_uri)
#     metadata = MetaData(engine)
#     metadata.reflect()
#     table = metadata.tables['follow_list']
#     Session = sessionmaker(bind=engine)
#     session = Session()
#     follows = session.query(table).filter_by(follower_id = id).all()

#     db.session.add(data)
#     db.session(commit()

#     return
