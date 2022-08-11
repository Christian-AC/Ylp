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

# def valid_website(form, field):
#     website = field.data
#     if "www" not in website or "." not in website:
#         raise ValidationError("Please send a valid website.")



class BusinessForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(message="Name is required"), Length(min=4, max=20, message="Name must be between 4 and 20 characters" )])
    address = StringField('address', validators=[DataRequired(message="Address is required"), Length(min=4, max=25,message="Address must be between 4 and 25 characters" )])
    city = StringField('city', validators=[DataRequired(message="City is required")])
    state = StringField('state', validators=[DataRequired(message="State is required")])
    phone_number = StringField('phone_number', validators=[DataRequired(message="Phone Number is required"),Length(min=10,message="Phone Number must be at least 10 digits" )])
    website = StringField('website', validators=[DataRequired(message="Website is required")])
