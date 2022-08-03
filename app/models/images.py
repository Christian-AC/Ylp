from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    businessId = db.Column(db.Integer,db.ForeignKey("businesses.id"), nullable=False)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    imgUrl = db.Column(db.String(500), nullable=False)

    userIds = db.relationship("User", back_populates="images")
    businessIds = db.relationship("Business", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'businessId': self.businessId,
            'userId': self.userId,
            'imgUrl': self.imgUrl,
        }
