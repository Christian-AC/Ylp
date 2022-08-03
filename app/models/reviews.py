from os import stat
from .db import db
import datetime



class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    businessId = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    userIds = db.relationship("User", back_populates="reviews")
    business = db.relationship("Business", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.userIds.to_dict(),
            'businessId': self.businessId,
            'content': self.content,
            'rating': self.rating,
            'created_at': self.created_at

        }
