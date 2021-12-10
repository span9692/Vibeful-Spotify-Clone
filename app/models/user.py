from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follow_list import follow_list


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), nullable=False, default='https://media.discordapp.net/attachments/917541871457275925/918846475897798727/default-user.jpeg')
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_pic': self.profile_pic
        }


    playlists = db.relationship('Playlist', back_populates='users', cascade="all, delete-orphan")

    follower = db.relationship('User', secondary=follow_list, secondaryjoin=(follow_list.c.follower_id == id), primaryjoin=(follow_list.c.followee_id == id), backref=db.backref('follow_list'))
