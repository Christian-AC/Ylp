from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Review, db
from app.forms.review_form import ReviewForm


review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# Gets all reivews
# @review_routes.route('')
# @login_required
# def reviews ():
#     reviews = Review.query.all()
#     return {'reviews': [review.to_dict() for review in reviews]}

#Gets a business's review
@review_routes.route('/<int:id>')
def review (id):

    reviews = Review.query.filter(Review.businessId == id)
    return {'reviews': [review.to_dict() for review in reviews]}


#Create a review
@review_routes.route('/create',methods=['POST'])
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            userId=form.data['userId'],
            businessId=form.data['businessId'],
            content=form.data['content'],
            rating=form.data['rating']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Edit a review
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        data = request.json
        review.content = data['content'],
        review.rating = data['rating']
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()
