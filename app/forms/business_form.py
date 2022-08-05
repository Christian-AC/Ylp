from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

# states = [
#  'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
#  'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
#  'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
#  'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
#  'VT','VI','VA','WA','WV','WI','WY'
# ]

def valid_website(form, field):
    web = field.data
    if "http" not in web or "." not in web:
        raise ValidationError("Please sender a valid website.")

# def valid_state(form, field):
#     state = field.data
#     if len(state) != 2 or state not in states:
#         raise ValidationError("Please enter a Valid state using abrivations")




class BusinessForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    phone_number = StringField('phone_number', validators=[DataRequired(), Length(min=9,max=9,message=None)])
    website = StringField('website', validators=[DataRequired(), valid_website])
