from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Business, db
from app.forms.business_form import BusinessForm

business_routes = Blueprint('business', __name__)
search_routes = Blueprint('search', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

#Search method
@search_routes.route('/search', methods=['POST'])
def search():
    pass



@business_routes.route('')
def businesses():
    businesses = Business.query.all()
    return {'businesses': [business.to_dict() for business in businesses]}


# @business_routes.route('/<int:id>')
# @login_required
# def business(id):
#     business = Business.query.get(id)
#     return business.to_dict()

@business_routes.route('/create', methods=['POST'])
@login_required
def post_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business(
            userId=form.data['userId'],
            name=form.data['name'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            phone_number=form.data['phone_number'],
            website=form.data['website'],
            imageURL=form.data['imageURL']
        )
        db.session.add(business)
        db.session.commit()
        return business.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
def put_business(id):
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business.query.get(id)
        data = request.json
        business.name=data['name'],
        business.address=data['address'],
        business.city=data['city'],
        business.state=data['state'],
        business.phone_number=data['phone_number'],
        business.website=data['website'],
        business.imageURL=data['imageURL']
        db.session.commit()
        return business.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@business_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_business(id):
    business = Business.query.get(id)
    db.session.delete(business)
    db.session.commit()
    return business.to_dict()
