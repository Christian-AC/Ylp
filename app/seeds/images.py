from app.models import db, Image


# Adds a businesses, you can add other businesses here if you want
def seed_image():
    food1 = Image(
        businessId = 1, userId = 2, imgUrl = "https://s3-media0.fl.yelpcdn.com/bphoto/Axmft3GVOxB36jXhdAXblg/o.jpg")
    food2 = Image(
        businessId = 2, userId = 3, imgUrl = "https://s3-media0.fl.yelpcdn.com/bphoto/s0hhyBCOvYKE83aniCOTcQ/o.jpg")
    food3 = Image(
        businessId = 3, userId = 1, imgUrl = "https://s3-media0.fl.yelpcdn.com/bphoto/s50tiysMWf2auzAhuZkJMg/o.jpg")

    db.session.add(food1)
    db.session.add(food2)
    db.session.add(food3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_image():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
