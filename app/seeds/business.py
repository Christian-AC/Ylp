from app.models import db, Business


# Adds a businesses, you can add other businesses here if you want
def seed_businesses():
    cane = Business(
        userId = 1, name= "Raising Cane's", address= "8430 Edgewater Dr", city= "Oakland", state= "California", phone_number="(510)542-5872", website="https://www.raisingcanes.com")
    hotboys = Business(
        userId = 2, name= "World Famous Hotboys", address= "1601 San Pablo Ave", city= "Oakland", state= "California", phone_number="(510)888-4892", website="https://www.worldfamoushotboys.com/")
    ramen = Business(
        userId = 3, name= "Marufuku Ramen", address= "4828 Telegraph Ave", city= "Oakland", state= "California", phone_number="(510) 823-2416", website="https://www.marufukuramen.com")

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
