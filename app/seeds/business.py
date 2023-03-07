from app.models import db, Business


# Adds a businesses, you can add other businesses here if you want
def seed_businesses():
    cane = Business(
        userId = 1,
        name= "Raising Cane's",
        address= "8430 Edgewater Dr Oakland, CA 94621",
        zipCode='94621',
        phone_number="5105425872",
        lat='37.744621',
        lng='-122.206404',
        website="https://www.raisingcanes.com",
        imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Raising_Cane%27s_Chicken_Fingers_logo.svg/1200px-Raising_Cane%27s_Chicken_Fingers_logo.svg.png')
    hotboys = Business(
        userId = 2,
        name= "World Famous Hotboys",
        address= "1601 San Pablo Ave Oakland, CA 94612",
        zipCode= "94612",
        phone_number="5108884892",
        lat='37.804485',
        lng='-122.271187',
        website="https://www.worldfamoushotboys.com/",
        imageURL = 'https://d33wubrfki0l68.cloudfront.net/706299a920cdcd72a8189d6826f7f1d1eb481db4/49fcd/assets/images/imagepng_0.jpg')
    ramen = Business(
        userId = 3,
        name= "Marufuku Ramen",
        address= "4828 Telegraph Ave Oakland, CA 94612",
        zipCode= "94609",
        phone_number="5108232416",
        lat='37.835316',
        lng='-122.262986',
        website="https://www.marufukuramen.com",
        imageURL= 'https://www.paloaltoonline.com/blogs/photos/12/4100.jpg')

    db.session.add(cane)
    db.session.add(hotboys)
    db.session.add(ramen)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
