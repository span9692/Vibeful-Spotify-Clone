# README

## Vibeful

<img height="400" width="500" src="https://user-images.githubusercontent.com/83468633/145766668-02a4c40d-c6d3-4bb3-a0b1-aaa97ba382cf.png">

[Vibeful](https://vybze.herokuapp.com/) is a clone of [Spotify.com](https://www.spotify.com/). Similar to Spotify, Vibeful is a music streaming application that gives users the ability to signup or log into an account, browse songs, 'like' songs, create playlists, add songs to those playlists, and, of course, play music.

[Live Site](https://vybze.herokuapp.com/)

### Technologies Used

> #### Libraries
> * React
> * Redux
> * React-Redux
> * NPM
> * SQLAlchemy
> * WTForms
> * PostgreSQL
> * Docker
>  * NodeJs


> #### Languages
> * Python
> * JavaScript
> * HTML
> * CSS


## Features

> ### Playlists
> <img height="400" width="500" src="https://user-images.githubusercontent.com/83468633/145767022-db105aea-af42-460e-8abf-acd17c78a13e.png">
> 
> * A user can create, view, update the name of, add songs to, and delete playlists. Once logged in, a user's playlists are always visible in the left-hand sidebar of the screen. Clicking on a playlist name in the sidebar will render the respective playlist's songs, as well as the button functionality to update the playlist name or delete the playlist. In addition to user's being able to create their own playlists, a 'Library' playlist is created automatically upon user account creation. The Library contains songs that a user has 'Liked' by clicking a song's 'heart' icon.


> ### Songs
> <img height="400" width="500" src="https://user-images.githubusercontent.com/83468633/145767226-af912ee2-6d8f-4f23-af26-29cdbec5c07a.png">
> 
> * A user can view and play songs from a playlist page, the 'Songs' page, which contains all of the app's songs, or the home page. All song listings include a 'heart' icon and a 'plus' icon next to them. Clicking the heart icon will add that song to the user's Library. Clicking the 'plus' will render a modal list of a user's playlists. Clicking one of these playlists will add that song to the playlist.

> ### Continuous Play
> * A logged in user can play a song from any component in which songs are listed and navigate to other components in the app without stopping or interrupting that song. 

> ### Search
> <img height="400" width="500" src="https://user-images.githubusercontent.com/83468633/145767400-58797f6e-f53f-497f-ba33-5b21ef5fdcd7.png">
>
> * A logged in user can search for songs. Search results are dynamically rendered, meaning search results will update/re-render afer each change made to the search field.

## Insight

> ### Interesting code
> There was a major challenge we encountered with implementing the "follows" feature. Our initial conception did not query/return all the data that was needed for persistence in the Redux store. This was not noted until further into project implementation when we decided to change the dashboard functionality. Initially, the dashboard was statically linked to just the logged-in user; however, we then decided to conditionally render it based on which user we viewed.

> This code is part of our backend route to retrieve all users' followers. Initially, it was engineered to reformat a list of tuples into unique users with an associated array:
```   userIds = User.query.all()
    ids = [user.id for user in userIds]

    followerslist = []
    followeeslist = []

    for id in ids:
        followers = db.session.query(follow_list).filter_by(followee_id = id).all()
        followerslist.append(followers)

    for id in ids:
        followees = db.session.query(follow_list).filter_by(follower_id = id).all()
        followeeslist.append(followees)

    final_followers_list = []
    final_followee_list = []

    for follow in followerslist:
        temp_followers_list = []
        for foll in follow:
            user_follower = User.query.get(foll.follower_id)
            temp_followers_list.append(user_follower.to_dict())
        final_followers_list.append(temp_followers_list)

    for follow in followeeslist:
        temp_followee_list = []
        for foll in follow:
            user_followee = User.query.get(foll.followee_id)
            temp_followee_list.append(user_followee.to_dict())
        final_followee_list.append(temp_followee_list)

    final_object = {}

    for id in ids:
        final_object[id] = {"followers":final_followers_list[id-1], 'followees':final_followee_list[id-1]} 
```

```
follow =  { 
            1 : [2, 3, 4]
            2 : [1, 3, 4]
            3 : [1, 2, 4]
           }
```
> As you can see, the previous "follow" data structure was unidirectional and did not provide an easy way for us to retrieve both the followers and followees. We would have to index against another table which would be undefined at certain times due to our data flow. This code was re-engineered so that now each key represents the user.id with two sub-keys with individual arrays of the followers *and* followees. 
> 
![image](https://user-images.githubusercontent.com/83468633/145769117-f53b71cd-2172-4524-9817-8e85e28dddc2.png)

> ### Future features
> Using the follower/followees feature to implement a "recommendation" for songs, genre, and playlists.
