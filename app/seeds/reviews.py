from app.models import db, Review

def seed_review():
    review1 = Review(
        businessId = 1, userId = 2, content = 'Raising Canes was Great! Line was super long tho', rating = 4
    )

    review2 = Review(
        businessId = 2, userId = 1, content = 'Probably best chicken sandwich in the area', rating = 5
    )

    review3 = Review(
        businessId = 3, userId = 1, content = 'The wait was well worth it', rating = 5
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()


def undo_review():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
