from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    businessId = StringField('businessId', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired(),Length(min=7, max=500, message="Reivew must be 7 to 500 characters long")])
    rating = StringField('rating', validators=[DataRequired()])
