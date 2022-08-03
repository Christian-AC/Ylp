from os import stat
from .db import db
import datetime



class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    phone_number = db.Column(db.String(40), nullable=False)
    website = db.Column(db.String(80), nullable=False)

    userIds = db.relationship("User", back_populates="business")
    reviews = db.relationship("Review", back_populates="business", cascade="all, delete")
    images = db.relationship("Image", back_populates="businessIds", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.userIds.to_dict(),
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'phone_number': self.phone_number,
            'website': self.website
        }
