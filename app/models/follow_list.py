from .db import db


follow_list = db.Table(
    "follow_list",
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('followee_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)
