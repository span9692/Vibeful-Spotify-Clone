# README

## Vybez

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
> * A user can create, view, update the name of, add songs to, and delete playlists. Once logged in, a user's playlists are always visible in the left-hand sidebar of the screen. Clicking on a playlist name in the sidebar will render the respective playlist's songs, as well as the button functionality to update the playlist name or delete the playlist. In addition to user's being able to create their own playlists, a 'Library' playlist is created automatically upon user account creation. The Library contains songs that a user has 'Liked' by clicking a song's 'heart' icon.


> ### Songs
> * A user can view and play songs from a playlist page, the 'Songs' page, which contains all of the app's songs, or the home page. All song listings include a 'heart' icon and a 'plus' icon next to them. Clicking the heart icon will add that song to the user's Library. Clicking the 'plus' will render a modal list of a user's playlists. Clicking one of these playlists will add that song to the playlist.

> ### Continuous Play
> * A logged in user can play a song from any component in which songs are listed and navigate to other components in the app without stopping or interrupting that song. 

> ### Search
> * A logged in user can search for songs. Search results are dynamically rendered, meaning search results will update/re-render afer each change made to the search field.
