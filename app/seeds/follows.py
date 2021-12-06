from app.models import db, follow_list

def seed_follow_list():
    db.session.execute(follow_list.insert().values(follower_id=1, followee_id=2))
    db.session.execute(follow_list.insert().values(follower_id=1, followee_id=3))
    db.session.execute(follow_list.insert().values(follower_id=1, followee_id=4))
    db.session.execute(follow_list.insert().values(follower_id=2, followee_id=1))
    db.session.execute(follow_list.insert().values(follower_id=2, followee_id=3))
    db.session.execute(follow_list.insert().values(follower_id=3, followee_id=4))
    db.session.execute(follow_list.insert().values(follower_id=4, followee_id=3))
    db.session.execute(follow_list.insert().values(follower_id=4, followee_id=2))
    db.session.execute(follow_list.insert().values(follower_id=4, followee_id=1))



    db.session.commit()

def undo_follow_list():
    db.session.execute('TRUNCATE follow_list RESTART IDENTITY CASCADE;')
    db.session.commit()