from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    Demo = User(first_name='Demo', last_name='User', email='user@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639338101/kid%20friendly%20profile%20pics/download_2_x7ot2p.png')
    Anthony = User(first_name='Anthony', last_name='Fahden', email='afahden@gmail.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639338788/kid%20friendly%20profile%20pics/il_fullxfull.1730247238_9lzr_ltukw1.jpg')
    David = User(first_name='David', last_name='Le', email='dle@gmail.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639338787/kid%20friendly%20profile%20pics/GUEST_082807f6-5dcb-49b0-b9d7-f653bc07264b_jiwh8n.jpg')
    Sean = User(first_name='Sean', last_name='Pan', email='span@gmail.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639338101/kid%20friendly%20profile%20pics/HtwPZgej_400x400_itffcg.jpg')
    Travis = User(first_name='Travis', last_name='Ly', email='tly@gmail.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639338101/kid%20friendly%20profile%20pics/tumblr_npxq43txnN1uxs3nbo1_640_ovvscy.jpg')
    User6 = User(first_name='Liliana', last_name='Beck', email='lbeck@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639338787/kid%20friendly%20profile%20pics/658-000662_1024x_bkl5gc.jpg')
    User7 = User(first_name='Josh', last_name='Davidson', email='jdavidson@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337999/kid%20friendly%20profile%20pics/cute-monster-web-icons-illustration-set_178650-472_cdy1xf.jpg')
    User8 = User(first_name='Rick', last_name='Morty', email='rmorty@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337999/kid%20friendly%20profile%20pics/Beagle1_hldyif.jpg')
    User9 = User(first_name='Jennifer', last_name='Mitchell', email='jmitchell@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337999/kid%20friendly%20profile%20pics/download_fembyc.png')
    User10 = User(first_name='Ella', last_name='Lamar', email='elamar@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337999/kid%20friendly%20profile%20pics/Baby_Plum_legacy_square_thumb_mo20d2.png')
    User11 = User(first_name='Dwayne', last_name='Jason', email='djason@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337999/kid%20friendly%20profile%20pics/340496996017201_df1v29.jpg')
    User12 = User(first_name='Amanda', last_name='Wong', email='awong@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337999/kid%20friendly%20profile%20pics/0_xpaufv.jpg')
    User13 = User(first_name='Emily', last_name='Tratch', email='etratch@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337999/kid%20friendly%20profile%20pics/charizard_smash_square_by_brian8tong_de9e17k-fullview_vkxm9e.jpg')
    User14 = User(first_name='Graham', last_name='Krack', email='gkrack@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337998/kid%20friendly%20profile%20pics/15b4c0a5fe584524fc1398cd2bf21b98_3b5ec522-878a-43c1-b915-6dafd0d39bcd_600x600_o863yn.jpg')
    User15 = User(first_name='Norton', last_name='Virus', email='nvirus@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639337998/kid%20friendly%20profile%20pics/383-3832785_vector-transparent-stock-creative-icon-livestock-pig-cute_aqlct2.jpg')
    User16 = User(first_name='Han', last_name='Walker', email='hwalker@demo.com', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639338788/kid%20friendly%20profile%20pics/water_artwork_juliekluh_10x10_53bbe505-3b78-4071-a3a0-649c55653b31_1024x1024_2x_mytykt.jpg')


    db.session.add(Demo)
    db.session.add(Anthony)
    db.session.add(David)
    db.session.add(Sean)
    db.session.add(Travis)
    db.session.add(User6)
    db.session.add(User7)
    db.session.add(User8)
    db.session.add(User9)
    db.session.add(User10)
    db.session.add(User11)
    db.session.add(User12)
    db.session.add(User13)
    db.session.add(User14)
    db.session.add(User15)
    db.session.add(User16)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
