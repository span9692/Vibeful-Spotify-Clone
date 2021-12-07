from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms import validators
from wtforms.validators import DataRequired, ValidationError


class UpdatePlaylistForm(FlaskForm):
    playlist_name = StringField('playlist_name')
    owner_id = IntegerField('owner_id')