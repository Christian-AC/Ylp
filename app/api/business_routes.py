from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Business, db
from app.forms.business_form import BusinessForm

business_routes = Blueprint('business', __name__)


@business_routes.route('')
@login_required
def businesses():
    businesses = Business.query.all()
    return {'businesses': [business.to_dict() for business in businesses]}


@business_routes.route('/<int:id>')
@login_required
def business(id):
    business = Business.query.get(id)
    return business.to_dict()

@business_routes.route('/create', methods=['POST'])
@login_required
def post_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    business = Business(
        userId=form.data['userId'],
        name=form.data['name'],
        address=form.data['address'],
        city=form.data['city'],
        state=form.data['state'],
        phone_number=form.data['phone_number'],
        website=form.data['website']
    )
    db.session.add(business)
    db.session.commit()
    return business.to_dict()
    # return {'errors'}

@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
def put_business(id):
    business = Business.query.get(id)
    data = request.json
    business.name=data['name'],
    business.address=data['address'],
    business.city=data['city'],
    business.state=data['state'],
    business.phone_number=data['phone_number'],
    business.website=data['website']
    db.session.commit()
    return business.to_dict()

@business_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_business(id):
    business = Business.query.get(id)
    db.session.delete(business)
    db.session.commit()
    return business.to_dict()
