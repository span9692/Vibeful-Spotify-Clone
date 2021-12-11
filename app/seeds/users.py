from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    Demo = User(first_name='Demo', last_name='User', email='user@demo.com', password='password')
    Anthony = User(first_name='Anthony', last_name='Fahden', email='afahden@gmail.com', password='password')
    David = User(first_name='David', last_name='Le', email='dle@gmail.com', password='password')
    Sean = User(first_name='Sean', last_name='Pan', email='span@gmail.com', password='password')
    Travis = User(first_name='Travis', last_name='Ly', email='tly@gmail.com', password='password')

    db.session.add(Demo)
    db.session.add(Anthony)
    db.session.add(David)
    db.session.add(Sean)
    db.session.add(Travis)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
