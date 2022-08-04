from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    businessId = StringField('businessId', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    rating = StringField('rating', validators=[DataRequired()])
