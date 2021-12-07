from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms import validators
from wtforms.validators import DataRequired, ValidationError


class PlaylistForm(FlaskForm):
    playlist_name = StringField('playlist_name', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])

